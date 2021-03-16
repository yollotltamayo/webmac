#![feature(proc_macro_hygiene, decl_macro)]

use rocket::error::Error;

#[macro_use]
extern crate rocket;

#[get("/")]
fn hello() -> String {
    format!("¡Hola MAC!")
}

#[rocket::main]
async fn main() -> Result<(), Error> {
    rocket::ignite().mount("/", routes![hello]).launch().await
}
