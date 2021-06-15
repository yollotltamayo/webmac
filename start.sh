export FLASK_APP=main.py
if  ! [ -x "$(command -v nodemon)" ]; then
    nodemon --exec "flask run" -e css,js,html
else
    echo "try the following npm i -g nodemon"
    flask run
fi
