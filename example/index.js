
import { get_info } from "ytv";

// any youtube video link
get_info("https://www.youtube.com/watch?v=HWR8Aw5htvE&t=59s&pp=ygUJ6rCQ7Iqk7Yq4")
.then(info => console.log(info));
