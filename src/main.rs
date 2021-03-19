#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;

#[get("/")]
fn hello() -> String {
    format!("¡Hola MAC!")
}

fn main() {
    rocket::ignite().mount("/", routes![hello]).launch();
}
