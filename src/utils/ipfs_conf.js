import { create } from "ipfs-http-client";

const projectId = "e7299e1cddca4018b5eb2ef0dbea036f";
const projectSecret = "+56p47y0ulcgWlWPIEckKiLek0Uy+quYTwHol4qnOdBLXXYJx+pcOg";
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

const ipfsClient = create({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
        authorization
    }
})

export default ipfsClient;