from flask import Flask,render_template,request,session,redirect,flash
import os
import db as d


app = Flask(__name__,
        static_url_path="",
        static_folder="static",
        template_folder="templates")

app.secret_key = 'holacomoestas'

PROJECT_ROOT = os.path.dirname(os.path.realpath(__file__))

DATABASE = 'base.sqlite'

app.config['DATABASE'] = DATABASE

def validar(user,password):
    db = d.get_db()
    _user = db.execute(
            'SELECT * FROM user WHERE username = ?', (user,)
        ).fetchone()
    if _user is None:
        return False
    if _user['username'] == user and _user['password'] == password:
        return True
    db.commit()

    return True
@app.route('/')
def index():
    if 'username' in session:
        session.clear()
        return render_template('index.html')
    else:
        return redirect('/login')

@app.route('/login',methods =('POST','GET'))
def login():
    if request.method == 'POST':
        user ,password = request.form['username'], request.form['password']
        if  validar(user,password):
            session['username'] = request.form['username']
            return redirect('/')
        flash('usuario o contraseña incorrectos')
        return redirect('/login')
    else:
        return render_template('login.html')

@app.route('/register',methods =('POST','GET'))
def register():
    if request.method == 'POST':
        user ,password = request.form['username'], request.form['password']
        if not password or not user:
            flash("ingresa contraseña"*(password=="") + " ingresa usuario"*(user==""))
            return redirect('/register')
        db = d.get_db()
        if db.execute(
            """select id from user where username = ?""",(user,)
            ).fetchone() is not None:
            flash("Usuario ya registrado")
            return redirect('/register')

        db.execute(
                 'INSERT INTO user (username, password) VALUES (?, ?)',
                (user,password)
        )
        db.commit()
        return redirect('/login')
    return render_template('register.html')

if __name__ == '__main__':
    d.init_db()
    app.run()
