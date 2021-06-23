export FLASK_APP=main.py
if   [ -x "$(command -v nodemon)" ]; then
    nodemon --exec "flask run" -e css,js,html,py,ts
else
    echo "prueb haciendo npm i -g nodemon"
    flask run
fi
