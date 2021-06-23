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
def get_user(user):
    db = d.get_db()

    _user = db.execute(
        'SELECT * FROM user WHERE username = ?', (user,)
    ).fetchone()
    return _user

def validar(user, password):
    _user= get_user(user)
    if _user is None:
        return False
    if _user['password'] == hash_password(password):
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
            _user =  get_user(user)
            session['avatar'] = "lol" if _user is None else _user['avatar']
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
        if get_user(user) is not None:
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
            new_pass = request.form['newpassword']
            password = request.form['password']
            avatar = request.form['avatar']

            user = session['username']
            new_user = request.form['username']

            error = None

            if (password,new_pass) == ("",""):
                password = None
            elif (len(password) >0 , len(new_pass) > 0 ) == (True,True):
                if validar(user,password) :
                    password = new_pass
                else:
                    error= 'Contraseña incorrecta.' 
            else:
                error = "Ambas contraseñas deben ser llenadas."

            if new_user != user and get_user(new_user) is not None :
                error = 'El nuevo username no esta disponible.'

            _user = get_user(user)
            def query ( new_word = None ):
                query  = """ UPDATE user
                    SET username = ?,
                        avatar = ?"""
                if new_word:
                    query += ",password = ? "
                query += """WHERE id = ?;"""
                return query

            if error:
               flash(error)
               return render_template('panel.html',user=session['username'],avatar=session['avatar'])
            else:
               db = d.get_db()
               if password:
                   db.execute( query(password) ,
                           (new_user,avatar,hash_password( new_pass),_user['id']))
                   db.commit()
               else:
                   print(query())
                   db.execute(query(), (new_user, avatar,_user['id']))
                   db.commit()
               session['username'] = new_user
               session['avatar'] = avatar
               return redirect('/login')
        return render_template('panel.html',user=session['username'],avatar=session['avatar'])



    return redirect('/login')

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/login')

@app.route('/pixel')
def pixel():
    return render_template("pixel.html")

@app.route('/delete',methods=["POST"])
def delete():
    db = d.get_db()
    print(session['username'])
    db.execute("""DELETE FROM user WHERE username = ?;""",(session['username'],))
    db.commit()
    session.clear()
    return redirect("/")

if __name__ == '__main__':
    d.init_db()
    app.run()

        
