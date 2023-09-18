
let {
    get_link2info,
    get_title2info
} = require("../src/youtube");

export async function get_info(video_link) {
    let info = new Object();
    let link2info, title2info;
    
    try {
        link2info = await get_link2info(video_link);
        title2info = await get_title2info(link2info.title);

    } catch(err) {
        return new Error(err);
    }

    Object.assign(info, link2info, title2info);

    return info;
}
