import nodeFetch, { Request } from "node-fetch";

global.fetch = nodeFetch;
global.Request = Request;
