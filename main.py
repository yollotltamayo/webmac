from utils import hash_password

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

def validar(user, password):
    db = d.get_db()

    _user = db.execute(
        'SELECT * FROM user WHERE username = ?', (user,)
    ).fetchone()

    if _user is None:
        return False
    if _user['password'] == hash_password(user, password):
        return True

    return False

@app.route('/')
def index():
    if all(val in session for val in  ['username','avatar']  ):
        return render_template('index.html',user=session['username'],avatar=session['avatar'])
    else:
        return redirect('/login')

@app.route('/login',methods =('POST','GET'))
def login():
    if request.method == 'POST':
        user, password = request.form['username'], request.form['password']
        if  validar(user, password):
            session.clear()
            session['username'] = request.form['username']
            session['avatar'] = "lol"
            db = d.get_db()
            avatar = db.execute( """SELECT avatar
                FROM user
                WHERE username = ?;""", (user,)
            ).fetchone() 
            session['avatar'] = "lol" if avatar is None else avatar['avatar']
            return redirect('/')
        flash('Usuario o contraseña incorrectos')
        return redirect('/login')
    else:
        return render_template('login.html')

@app.route('/register',methods =('POST','GET'))
def register():
    if request.method == 'POST':
        user = request.form['username']
        avatar = request.form['avatar']

        db = d.get_db()
        if db.execute(
            """SELECT ID
            FROM user
            WHERE username = ?""", (user,)
        ).fetchone() is not None:
            flash("Usuario ya registrado.")
            return redirect('/register')

        db.execute(
            "INSERT INTO user (username, password,avatar) VALUES (?, ?,?)",
            (user, hash_password(user, request.form['password']),avatar)
        )
        db.commit()
        return redirect('/login')

    return render_template('register.html')

@app.route('/panel',methods =('POST','GET'))
def panel():
    if 'username' in session:
        if request.method == 'POST':
                pass
        return render_template('panel.html')
    return redirect('/login')

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/login')
@app.route('/pixel')
def pixel():
    return render_template("pixel.html")

if __name__ == '__main__':
    d.init_db()
    app.run()

        
