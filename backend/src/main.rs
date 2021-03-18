#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;
extern crate serde_json;
//use rocket::response::content::Json;
use serde::Serialize;
use rocket_contrib::json::Json;
use rocket::{Request, Response};
use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::Header;
#[get("/")]
fn hello() -> String {
    format!("¡Hola MAC!")
}
#[derive(Serialize)]
struct User {
    nombre : String,
    edad : u32
}
#[get("/bra/<nombre>/<edad>")]
fn bra(nombre:String, edad:u32)-> Json<User>{
    Json(User{
        nombre : "HOLA ".to_owned() + &nombre + " TE SALUDO DESDE RUST",
        edad :  edad
    })
}
fn main() {
    rocket::ignite()
        .mount("/", routes![hello,bra])
        .attach(CORS())
        .launch();
}

// Agregue los headers de CORS 
//           v
pub struct CORS();
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to requests",
            kind: Kind::Response
        }
    }
    fn on_response(&self, request: &Request, response: &mut Response) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new("Access-Control-Allow-Methods", "POST, GET, PATCH, OPTIONS"));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}

