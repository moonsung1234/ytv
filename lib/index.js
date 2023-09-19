
let {
    get_link2info,
    get_title2info
} = require("../src/youtube");

/**
 * 
 * @param {string} video_link 
 * @typedef {Object} info
 * @property {string} title - youtube video title
 * @property {int} view - youtube video view
 * @property {Array} hashtag - youtube video hashtags
 * @property {string} date - youtube video upload date
 * @property {string} small_thumbnail - youtube video small thumbnail (360x202)
 * @property {string} big_thumbnail - youtube video big thumbnail (720x404)
 * @property {string} channel_name - youtube video's channel name
 * @property {string} video_length - youtube video length
 * @returns {info}
 */
async function get_info(video_link) {
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

module.exports = {
    get_info
}
