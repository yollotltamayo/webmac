from main import app
import db as d
if __name__ == "__main__":
    d.init_db()
    app.run()


