Jekyll::Hooks.register(:site, :post_write) do |site|
	css = File.read(File.join(site.config['destination'], "assets/main.css"),
									:encoding => 'UTF-8')
	css = css.gsub(/\n/, '')
	inline = "<style type=\"text/css\">" + css + "</style>"
	Dir.glob(site.config['destination'] + "/**/*.html") { |file|
		old = File.read(file, :encoding => 'UTF-8')
		new = old.gsub(/<link rel="stylesheet" href="\/assets\/main.css">/, inline)
		File.open(file, 'w') do |f|
			f.write(new)
		end
	}
end
