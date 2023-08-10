fx_version 'cerulean'
game 'gta5'
lua54 'yes'

dependencies {
	'/server:5102',
	'/onesync',
}

client_scripts {
   'shared/*.lua',
   'client/radio/enum/*.lua',
	'client/radio/*.lua',
   'client/*.lua'
}

server_scripts {
   "server/playerList/*.lua",
}

ui_page 'html-ui/index.html'

files {
   'html-ui/assets/images/*.png',
   'html-ui/assets/sounds/*.mp3',
   'html-ui/src/class/*.js',
   'html-ui/src/class/radio-menu/*.js',
   'html-ui/src/class/radio-menu/menu/*.js',
   'html-ui/src/config/*.js',
   'html-ui/src/enum/*.js',
   'html-ui/src/utils/*.js',
   'html-ui/src/*.js',
   'html-ui/index.html',
   'html-ui/index.css',
   'html-ui/images/**/*.png'
}

dependency '/assetpacks'