
import axios from "axios";
import { 
  SEARCH_LINK, 
  is_url, 
  flatten_object 
} from "./env.js";

/**
 * 
 * @param {string} link 
 * @typedef {Object} link2info
 * @property {string} title - youtube video title
 * @property {int} view - youtube video view
 * @property {Array} hashtag - youtube video hashtags
 * @property {string} date - youtube video upload date
 * @returns {link2info}
 */
export async function get_link2info(link) {
  if(!is_url(link)) {
      return new URIError("The Link Format is Incorrect!");
  }

  return new Promise((resolve, reject) => {
    axios.get(link)
    .then(res => {
      let json = JSON.parse(res.data.split("ytInitialData = ")[1].split(";</script>")[0]);
      let content = json.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer;
    
      let title = content.title.runs[0].text;
      let view = parseInt(content.viewCount.videoViewCountRenderer.viewCount.simpleText.replace(/[^0-9]/g, ""));
      let hashtag = (content.superTitleLink || { runs : [] }).runs.map(c => c.text).filter(v => v.trim().length > 0);
      let date = content.dateText.simpleText;
    
      resolve({
        title, 
        view,
        hashtag,
        date
      });
    })
    .catch(err => {
      reject(err);
    });
  });
}

/**
 * 
 * @param {string} title 
 * @typedef {Object} title2info
 * @property {string} small_thumbnail - youtube video small thumbnail (360x202)
 * @property {string} big_thumbnail - youtube video big thumbnail (720x404)
 * @property {string} channel_name - youtube video's channel name
 * @property {string} video_length - youtube video length
 * @returns {title2info}
 */
export async function get_title2info(title) {
  return new Promise((resolve, reject) => {
    axios.get(SEARCH_LINK + encodeURI(title))
    .then(res => {
      let json = JSON.parse(res.data.split("ytInitialData = ")[1].split(";</script>")[0]);
      let content = json.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
      content = content.filter(c => Object.keys(c).indexOf("videoRenderer") != -1)[0];
  
      let small_thumbnail = content.videoRenderer.thumbnail.thumbnails[0].url;
      let big_thumbnail = content.videoRenderer.thumbnail.thumbnails[1].url;
      let channel_name = content.videoRenderer.longBylineText.runs[0].text;
      let video_length = content.videoRenderer.lengthText.simpleText;

      resolve({
        small_thumbnail,
        big_thumbnail,
        channel_name,
        video_length
      });
    })
    .catch(err => {
      reject(err);
    });
  });
}