#!/bin/bash

bundle check || bundle install

bundle exec jekyll serve --host 0.0.0.0
