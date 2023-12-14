use std::env;

fn main() {
    let token: String = match env::var("BOT_TOKEN") {
        Ok(val) => val,
        Err(e) => panic!("Error: failed to get token, {}", e),
    };
    print!("bot token is: {}", token);
}
