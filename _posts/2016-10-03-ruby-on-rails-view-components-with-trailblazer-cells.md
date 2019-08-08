---
title: Ruby on Rails view components with Trailblazer Cells
description: >-
  How to create view components in your Ruby on Rails applications? With this
  tutorial, you'll be able to see how to create them using Trailblazer Cells!
slug: ruby-on-rails-trailblazer-cells
twitter-card: summary_large_image
date: '2016-10-03 10:38:01 +0000'
category: Ruby on Rails development
author: Mikołaj Grygiel
avatar: claus.jpg
image: trailblazer.jpg
text-preview: >-
  In recent times view components became a really popular web design pattern.
  View component is standalone part of view, which can be used at many views.
tags:
  - Ruby on Rails development
---


In recent times view components became a really popular web design pattern. View component is standalone part of view, which can be used at many views.

Most common JavaScript frontend frameworks like React, Ember or Angular use view components pattern. Even last hot topic in web world ["Web Components"](http://webcomponents.org/) is just implementation of view components.

Ok, but it’s all about JavaScript world. What if we want to stay in Rails world? Can we use view components in RoR app? Yes, We can! We can do it with [Trailblazer Cells](http://trailblazer.to/gems/cells/).

On the first page of Cells documentation we read:

> A cell is an object that represent a fragment of your UI. The scope of that fragment is up to you: it can embrace an entire page, a single comment container in a thread or just an avatar image link.

I could just list adventages of cells, but you can find them in the ["documentation"](http://trailblazer.to/gems/cells). I would like to show simple example of cells’ usage. I hope it will show you benefits of view components in rails app.

The example is a simple app with CRUD actions for below database.

![trailblazer_one](/_assets/images/trailblazer1.png)

Let’s start by creating the app with scaffolds.
  1. ```rails new cells-app```
  2. ```cd cells-app```
  3. ```rails g scaffold company name:string city:string```
  4. ```rails g scaffold department name:string company:references```
  5. ```rails g scaffold employee first_name:string last_name:string department:references```
  6. ```rake db:create db:migrate```
  7. add ```root to: ‘companies#index’``` to ```config/routes.rb```

We’ve created base app with scaffolds for company, department and employee. Now we can configure cells’:
  1. Add to gemfile:
    - ```gem "trailblazer-cells"```
    - ```gem "cells-erb"```
    - ```gem "cells-rails"```
  2. Run ```bundle install```
  3. Run ```mkdir app/cells```

So, finally we can go to most interesting part – cells implementation. If we list the ```app/views``` we will see that we already have a lot of views:

<img class="post--trailblazer-image" src="/_assets/images/trailblazer2.png" alt="trailblazer-master-tree-view">

We will use code from these views in our cells.

We will create cells for each type of view:
  - ```IndexCell```
  - ```ShowCell```
  - ```NewCell```
  - ```EditCell```

And some view components cells:
  - ```TableCell```
  - ```TitleCell```
  - ```FormCell```
  - ```NoticeCell```

We will replace each template with cell. Completed project you can find on ["GitHub"](https://github.com/Naturaily/cells-app). Here I will just show two examples of cells: ```TableCell``` and ```IndexCell```.

## TableCell

Firstly, we need to create files structure. ```TableCell``` is built from one ruby file and four erb(html) files. Our cells’ directory should look like below.

<img class="post--trailblazer-image" src="/_assets/images/trailblazer3.png" alt="trailblazer-app-cells-view">

```table_cell.rb``` is the core of our cell, it contains all helpful methods.

`table_cell.rb`

```ruby

  class TableCell < Cell::ViewModel
    def items
      model[:items]
    end

    def attributes
      model[:attributes]
    end

    def model_name
      model[:model_name]
    end

    def header
      render
    end

    def body
      render
    end

    def row(item)
      @item = item
      render
    end

    def row_attributes(item)
      attributes.map do |attribute|
        item.send(attribute)
      end
    end

    def show_path(item)
      polymorphic_path(item)
    end

    def edit_path(item)
      edit_polymorphic_path(item)
    end
  end

```

The main view part of ```TableCell``` is ```show.erb```, it will be rendered while we will use the cell. It contains table tag and renders ```header.erb``` and ```body.erb``` views.

`table/show.erb`

```erb
  <table>
    <%= header %>
    <%= body %>
  </table>
```

In ```header.erb``` we put ```thead``` tag and ```th``` tag for each attribute provided to cell.

`table/header.erb`

```erb
  <thead>
    <tr>
      <% attributes.each do |header| %>
        <%= content_tag :th, header.capitalize %>
      <% end %>
      <th colspan="3"></th>
    </tr>
  </thead>
```

In ```body.erb``` we render table row for each item provided to cell.

`table/body.erb`

```erb
  <% items.each do |item| %>
    <%= content_tag :tr, row(item) %>
  <% end %>
```

```row.erb``` creates ```td``` tag for each attribute of the item.

`table/row.erb`

```erb
  <% row_attributes(@item).each do |attribute| %>
    <%= content_tag :td, attribute %>
  <% end %>
  <td><%= link_to 'Show', show_path(@item) %></td>
  <td><%= link_to 'Edit', edit_path(@item) %></td>
  <td>
    <%= link_to 'Destroy', show_path(@item), method: :delete, data: { confirm: 'Are you sure?' } %>
  </td>
```

## IndexCell

At first we need to add abstract ```PageCell``` with html layout, the main job of layout is including javascript and stylesheets assets. Each view needs to load the layout, so views cells will inherit from the ```PageCell```. We have to create ```app/cells/page_cell.rb``` and ```app/cells/page/layout.erb``` files.

`page_cell.erb`

```ruby
  class PageCell < Cell::ViewModel
    layout :layout
  end
```

`page/layout.erb`

```erb
  <!DOCTYPE html>
  <html>
    <head>
      <title>CellsApp</title>
      <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track' => true %>
      <%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>
    </head>
    <body>

    <%= yield %>

    </body>
  </html>
```

Let’s speed up. I’ve already created ```TitleCell``` and ```NoticeCell```. We need them for ```IndexCell```.
```IndexCell``` displays all of needed components on index page.

`index_cell.erb`

```ruby
  class IndexCell < PageCell
    def items
      model[:items]
    end

    def attributes
      model[:attributes]
    end

    def model_name
      model[:model_name]
    end

    def notice
      model[:notice]
    end

    def new_path
      new_polymorphic_path(model_name)
    end
  end
```

`index/show.erb`

```erb
  <%=cell NoticeCell, notice: notice %>

  <%=cell TitleCell, title: "Listing #{model_name.pluralize.capitalize}" %>
  <%=cell TableCell, items: items, attributes: attributes %>

  <br>

  <%= link_to "New #{model_name.capitalize}", new_path %>
```

Implementation of others cells you can see at the repository.
So, we have all cells ready. Let’s use them.

`companies_controller.rb`

```ruby
  class CompaniesController < ApplicationController
    before_action :set_company, only: [:show, :edit, :update, :destroy]

    def index
      render html: cell(IndexCell, items: Company.all, model_name: 'company',
        attributes: [:name, :city], notice: notice)
    end

    def show
      render html: cell(ShowCell, item: @company, model_name: 'company',
        attributes: [:name, :city], notice: notice)
    end

    def new
      render html: cell(NewCell, item: Company.new, model_name: 'company',
        attributes: [:name, :city])
    end

    def edit
      render html: cell(EditCell, item: @company, model_name: 'company',
        attributes: [:name, :city], notice: notice)
    end
  ...
```

`departments_controller.rb`

```ruby
  class DepartmentsController < ApplicationController
    before_action :set_department, only: [:show, :edit, :update, :destroy]

    def index
      render html: cell(IndexCell, items: Department.all, model_name: 'department',
        attributes: [:name, :company], notice: notice)
    end

    def show
      render html: cell(ShowCell, item: @department, model_name: 'department',
        attributes: [:name, :company], notice: notice)
    end

    def new
      render html: cell(NewCell, item: Department.new, model_name: 'department',
        attributes: [:name, :company_id])
    end

    def edit
      render html: cell(EditCell, item: @department, model_name: 'department',
        attributes: [:name, :company_id], notice: notice)
    end
```

`employees_controller.rb`

```ruby
  class EmployeesController < ApplicationController
    before_action :set_employee, only: [:show, :edit, :update, :destroy]

    def index
      render html: cell(IndexCell, items: Employee.all, model_name: 'employee',
        attributes: [:first_name, :last_name, :department], notice: notice)
    end

    def show
      render html: cell(ShowCell, item: @employee, model_name: 'employee',
        attributes: [:first_name, :last_name, :department], notice: notice)
    end

    def new
      render html: cell(NewCell, item: Employee.new, model_name: 'employee',
        attributes: [:first_name, :last_name, :department_id])
    end

    def edit
      render html: cell(EditCell, item: @employee, model_name: 'employee',
        attributes: [:first_name, :last_name, :department_id], notice: notice)
    end
```



As you can see we have used the same cells for all controllers. That is the power of cells. Now If you want to change title header size for all pages, you have to just change one file, the ```TitleCell```:

```bash
  diff --git a/app/cells/title/show.erb b/app/cells/title/show.erb
  index 580040d..f8704a2 100644
  --- a/app/cells/title/show.erb
  +++ b/app/cells/title/show.erb
  @@ -1,3 +1,3 @@
  -<h1>
  +<h3>
     <%= title %>
  -</h1>
  \ No newline at end of file
  +</h3>
  \ No newline at end of file
```



That’s all. The change at one file is propagated to all views. How cool is that? And that is the sense of cells.

Of course, cells have more advantages, but I had only one goal in this article. I wanted to show you that with cells you can create flexible and reusable views at rails. I hope that now you can see it.
