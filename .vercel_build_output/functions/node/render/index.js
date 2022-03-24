var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.303_sass@1.49.9+svelte@3.46.4/node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var import_node_worker_threads, s, S, f, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/.pnpm/@sveltejs+kit@1.0.0-next.303_sass@1.49.9+svelte@3.46.4/node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js"() {
    import_node_worker_threads = require("worker_threads");
    init_install_fetch();
    globalThis.DOMException || (() => {
      const port = new import_node_worker_threads.MessageChannel().port1;
      const ab = new ArrayBuffer(0);
      try {
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        return err.constructor;
      }
    })();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f = 1;
    F = {
      PART_BOUNDARY: f,
      LAST_BOUNDARY: f *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.303_sass@1.49.9+svelte@3.46.4/node_modules/@sveltejs/kit/dist/install-fetch.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base642 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base642 = true;
    } else {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base642 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
function formDataToBlob(F2, B = Blob$1) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  const { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error2 = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
function fromRawHeaders(headers = []) {
  return new Headers2(headers.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_net.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (/^(.+\.)*localhost$/.test(url.host)) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request2(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dataUriToBuffer(request.url);
      const response2 = new Response2(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https.default : import_node_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_node_stream.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL, options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s3) => {
        let endedWithEventsCount;
        s3.prependListener("end", () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              headers.set("Location", locationURL);
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers2(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve2(fetch2(new Request2(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream.pipeline)(response_, new import_node_stream.PassThrough(), reject);
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream.pipeline)(body, import_node_zlib.default.createGunzip(zlibOptions), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream.pipeline)(response_, new import_node_stream.PassThrough(), reject);
        raw.once("data", (chunk) => {
          body = (chunk[0] & 15) === 8 ? (0, import_node_stream.pipeline)(body, import_node_zlib.default.createInflate(), reject) : (0, import_node_stream.pipeline)(body, import_node_zlib.default.createInflateRaw(), reject);
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream.pipeline)(body, import_node_zlib.default.createBrotliDecompress(), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}
function installFetch() {
  Object.defineProperties(globalThis, {
    fetch: {
      enumerable: true,
      configurable: true,
      value: fetch2
    },
    Response: {
      enumerable: true,
      configurable: true,
      value: Response2
    },
    Request: {
      enumerable: true,
      configurable: true,
      value: Request2
    },
    Headers: {
      enumerable: true,
      configurable: true,
      value: Headers2
    }
  });
}
var import_node_http, import_node_https, import_node_zlib, import_node_stream, import_node_util, import_node_url, import_net, commonjsGlobal, ponyfill_es2018, POOL_SIZE$1, POOL_SIZE, _parts, _type, _size, _a, _Blob, Blob, Blob$1, _lastModified, _name, _a2, _File, File, t, i, h, r, m, f2, e, x, _d, _a3, FormData, FetchBaseError, FetchError, NAME, isURLSearchParameters, isBlob, isAbortSignal, INTERNALS$2, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream, validateHeaderName, validateHeaderValue, Headers2, redirectStatus, isRedirect, INTERNALS$1, Response2, getSearch, ReferrerPolicy, DEFAULT_REFERRER_POLICY, INTERNALS, isRequest, Request2, getNodeRequestOptions, AbortError, supportedSchemas;
var init_install_fetch = __esm({
  "node_modules/.pnpm/@sveltejs+kit@1.0.0-next.303_sass@1.49.9+svelte@3.46.4/node_modules/@sveltejs/kit/dist/install-fetch.js"() {
    import_node_http = __toESM(require("http"), 1);
    import_node_https = __toESM(require("https"), 1);
    import_node_zlib = __toESM(require("zlib"), 1);
    import_node_stream = __toESM(require("stream"), 1);
    import_node_util = require("util");
    import_node_url = require("url");
    import_net = require("net");
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    ponyfill_es2018 = { exports: {} };
    (function(module2, exports) {
      (function(global2, factory) {
        factory(exports);
      })(commonjsGlobal, function(exports2) {
        const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
        function noop3() {
          return void 0;
        }
        function getGlobals() {
          if (typeof self !== "undefined") {
            return self;
          } else if (typeof window !== "undefined") {
            return window;
          } else if (typeof commonjsGlobal !== "undefined") {
            return commonjsGlobal;
          }
          return void 0;
        }
        const globals = getGlobals();
        function typeIsObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        const rethrowAssertionErrorRejection = noop3;
        const originalPromise = Promise;
        const originalPromiseThen = Promise.prototype.then;
        const originalPromiseResolve = Promise.resolve.bind(originalPromise);
        const originalPromiseReject = Promise.reject.bind(originalPromise);
        function newPromise(executor) {
          return new originalPromise(executor);
        }
        function promiseResolvedWith(value) {
          return originalPromiseResolve(value);
        }
        function promiseRejectedWith(reason) {
          return originalPromiseReject(reason);
        }
        function PerformPromiseThen(promise, onFulfilled, onRejected) {
          return originalPromiseThen.call(promise, onFulfilled, onRejected);
        }
        function uponPromise(promise, onFulfilled, onRejected) {
          PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
        }
        function uponFulfillment(promise, onFulfilled) {
          uponPromise(promise, onFulfilled);
        }
        function uponRejection(promise, onRejected) {
          uponPromise(promise, void 0, onRejected);
        }
        function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
          return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
        }
        function setPromiseIsHandledToTrue(promise) {
          PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
        }
        const queueMicrotask2 = (() => {
          const globalQueueMicrotask = globals && globals.queueMicrotask;
          if (typeof globalQueueMicrotask === "function") {
            return globalQueueMicrotask;
          }
          const resolvedPromise = promiseResolvedWith(void 0);
          return (fn) => PerformPromiseThen(resolvedPromise, fn);
        })();
        function reflectCall(F2, V, args) {
          if (typeof F2 !== "function") {
            throw new TypeError("Argument is not a function");
          }
          return Function.prototype.apply.call(F2, V, args);
        }
        function promiseCall(F2, V, args) {
          try {
            return promiseResolvedWith(reflectCall(F2, V, args));
          } catch (value) {
            return promiseRejectedWith(value);
          }
        }
        const QUEUE_MAX_ARRAY_SIZE = 16384;
        class SimpleQueue {
          constructor() {
            this._cursor = 0;
            this._size = 0;
            this._front = {
              _elements: [],
              _next: void 0
            };
            this._back = this._front;
            this._cursor = 0;
            this._size = 0;
          }
          get length() {
            return this._size;
          }
          push(element) {
            const oldBack = this._back;
            let newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
              newBack = {
                _elements: [],
                _next: void 0
              };
            }
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
              this._back = newBack;
              oldBack._next = newBack;
            }
            ++this._size;
          }
          shift() {
            const oldFront = this._front;
            let newFront = oldFront;
            const oldCursor = this._cursor;
            let newCursor = oldCursor + 1;
            const elements = oldFront._elements;
            const element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
              newFront = oldFront._next;
              newCursor = 0;
            }
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
              this._front = newFront;
            }
            elements[oldCursor] = void 0;
            return element;
          }
          forEach(callback) {
            let i2 = this._cursor;
            let node = this._front;
            let elements = node._elements;
            while (i2 !== elements.length || node._next !== void 0) {
              if (i2 === elements.length) {
                node = node._next;
                elements = node._elements;
                i2 = 0;
                if (elements.length === 0) {
                  break;
                }
              }
              callback(elements[i2]);
              ++i2;
            }
          }
          peek() {
            const front = this._front;
            const cursor = this._cursor;
            return front._elements[cursor];
          }
        }
        function ReadableStreamReaderGenericInitialize(reader, stream) {
          reader._ownerReadableStream = stream;
          stream._reader = reader;
          if (stream._state === "readable") {
            defaultReaderClosedPromiseInitialize(reader);
          } else if (stream._state === "closed") {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
          } else {
            defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
          }
        }
        function ReadableStreamReaderGenericCancel(reader, reason) {
          const stream = reader._ownerReadableStream;
          return ReadableStreamCancel(stream, reason);
        }
        function ReadableStreamReaderGenericRelease(reader) {
          if (reader._ownerReadableStream._state === "readable") {
            defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          } else {
            defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          }
          reader._ownerReadableStream._reader = void 0;
          reader._ownerReadableStream = void 0;
        }
        function readerLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released reader");
        }
        function defaultReaderClosedPromiseInitialize(reader) {
          reader._closedPromise = newPromise((resolve2, reject) => {
            reader._closedPromise_resolve = resolve2;
            reader._closedPromise_reject = reject;
          });
        }
        function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseReject(reader, reason);
        }
        function defaultReaderClosedPromiseInitializeAsResolved(reader) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseResolve(reader);
        }
        function defaultReaderClosedPromiseReject(reader, reason) {
          if (reader._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(reader._closedPromise);
          reader._closedPromise_reject(reason);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        function defaultReaderClosedPromiseResetToRejected(reader, reason) {
          defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
        }
        function defaultReaderClosedPromiseResolve(reader) {
          if (reader._closedPromise_resolve === void 0) {
            return;
          }
          reader._closedPromise_resolve(void 0);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
        const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
        const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
        const PullSteps = SymbolPolyfill("[[PullSteps]]");
        const NumberIsFinite = Number.isFinite || function(x2) {
          return typeof x2 === "number" && isFinite(x2);
        };
        const MathTrunc = Math.trunc || function(v) {
          return v < 0 ? Math.ceil(v) : Math.floor(v);
        };
        function isDictionary(x2) {
          return typeof x2 === "object" || typeof x2 === "function";
        }
        function assertDictionary(obj, context) {
          if (obj !== void 0 && !isDictionary(obj)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertFunction(x2, context) {
          if (typeof x2 !== "function") {
            throw new TypeError(`${context} is not a function.`);
          }
        }
        function isObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        function assertObject(x2, context) {
          if (!isObject(x2)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertRequiredArgument(x2, position, context) {
          if (x2 === void 0) {
            throw new TypeError(`Parameter ${position} is required in '${context}'.`);
          }
        }
        function assertRequiredField(x2, field, context) {
          if (x2 === void 0) {
            throw new TypeError(`${field} is required in '${context}'.`);
          }
        }
        function convertUnrestrictedDouble(value) {
          return Number(value);
        }
        function censorNegativeZero(x2) {
          return x2 === 0 ? 0 : x2;
        }
        function integerPart(x2) {
          return censorNegativeZero(MathTrunc(x2));
        }
        function convertUnsignedLongLongWithEnforceRange(value, context) {
          const lowerBound = 0;
          const upperBound = Number.MAX_SAFE_INTEGER;
          let x2 = Number(value);
          x2 = censorNegativeZero(x2);
          if (!NumberIsFinite(x2)) {
            throw new TypeError(`${context} is not a finite number`);
          }
          x2 = integerPart(x2);
          if (x2 < lowerBound || x2 > upperBound) {
            throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
          }
          if (!NumberIsFinite(x2) || x2 === 0) {
            return 0;
          }
          return x2;
        }
        function assertReadableStream(x2, context) {
          if (!IsReadableStream(x2)) {
            throw new TypeError(`${context} is not a ReadableStream.`);
          }
        }
        function AcquireReadableStreamDefaultReader(stream) {
          return new ReadableStreamDefaultReader(stream);
        }
        function ReadableStreamAddReadRequest(stream, readRequest) {
          stream._reader._readRequests.push(readRequest);
        }
        function ReadableStreamFulfillReadRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readRequest = reader._readRequests.shift();
          if (done) {
            readRequest._closeSteps();
          } else {
            readRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadRequests(stream) {
          return stream._reader._readRequests.length;
        }
        function ReadableStreamHasDefaultReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamDefaultReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamDefaultReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("read"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: () => resolvePromise({ value: void 0, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamDefaultReader(this)) {
              throw defaultReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamDefaultReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultReader",
            configurable: true
          });
        }
        function IsReadableStreamDefaultReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultReader;
        }
        function ReadableStreamDefaultReaderRead(reader, readRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "closed") {
            readRequest._closeSteps();
          } else if (stream._state === "errored") {
            readRequest._errorSteps(stream._storedError);
          } else {
            stream._readableStreamController[PullSteps](readRequest);
          }
        }
        function defaultReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
        }
        const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
        }).prototype);
        class ReadableStreamAsyncIteratorImpl {
          constructor(reader, preventCancel) {
            this._ongoingPromise = void 0;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
          }
          next() {
            const nextSteps = () => this._nextSteps();
            this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
            return this._ongoingPromise;
          }
          return(value) {
            const returnSteps = () => this._returnSteps(value);
            return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
          }
          _nextSteps() {
            if (this._isFinished) {
              return Promise.resolve({ value: void 0, done: true });
            }
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("iterate"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => {
                this._ongoingPromise = void 0;
                queueMicrotask2(() => resolvePromise({ value: chunk, done: false }));
              },
              _closeSteps: () => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                resolvePromise({ value: void 0, done: true });
              },
              _errorSteps: (reason) => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                rejectPromise(reason);
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
          }
          _returnSteps(value) {
            if (this._isFinished) {
              return Promise.resolve({ value, done: true });
            }
            this._isFinished = true;
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("finish iterating"));
            }
            if (!this._preventCancel) {
              const result = ReadableStreamReaderGenericCancel(reader, value);
              ReadableStreamReaderGenericRelease(reader);
              return transformPromiseWith(result, () => ({ value, done: true }));
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value, done: true });
          }
        }
        const ReadableStreamAsyncIteratorPrototype = {
          next() {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
            }
            return this._asyncIteratorImpl.next();
          },
          return(value) {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
            }
            return this._asyncIteratorImpl.return(value);
          }
        };
        if (AsyncIteratorPrototype !== void 0) {
          Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
        }
        function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
          const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
          iterator._asyncIteratorImpl = impl;
          return iterator;
        }
        function IsReadableStreamAsyncIterator(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
            return false;
          }
          try {
            return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
          } catch (_a4) {
            return false;
          }
        }
        function streamAsyncIteratorBrandCheckException(name) {
          return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
        }
        const NumberIsNaN = Number.isNaN || function(x2) {
          return x2 !== x2;
        };
        function CreateArrayFromList(elements) {
          return elements.slice();
        }
        function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
          new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
        }
        function TransferArrayBuffer(O) {
          return O;
        }
        function IsDetachedBuffer(O) {
          return false;
        }
        function ArrayBufferSlice(buffer, begin, end) {
          if (buffer.slice) {
            return buffer.slice(begin, end);
          }
          const length = end - begin;
          const slice = new ArrayBuffer(length);
          CopyDataBlockBytes(slice, 0, buffer, begin, length);
          return slice;
        }
        function IsNonNegativeNumber(v) {
          if (typeof v !== "number") {
            return false;
          }
          if (NumberIsNaN(v)) {
            return false;
          }
          if (v < 0) {
            return false;
          }
          return true;
        }
        function CloneAsUint8Array(O) {
          const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
          return new Uint8Array(buffer);
        }
        function DequeueValue(container) {
          const pair = container._queue.shift();
          container._queueTotalSize -= pair.size;
          if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
          }
          return pair.value;
        }
        function EnqueueValueWithSize(container, value, size) {
          if (!IsNonNegativeNumber(size) || size === Infinity) {
            throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
          }
          container._queue.push({ value, size });
          container._queueTotalSize += size;
        }
        function PeekQueueValue(container) {
          const pair = container._queue.peek();
          return pair.value;
        }
        function ResetQueue(container) {
          container._queue = new SimpleQueue();
          container._queueTotalSize = 0;
        }
        class ReadableStreamBYOBRequest {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get view() {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("view");
            }
            return this._view;
          }
          respond(bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respond");
            }
            assertRequiredArgument(bytesWritten, 1, "respond");
            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(this._view.buffer))
              ;
            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
          }
          respondWithNewView(view) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respondWithNewView");
            }
            assertRequiredArgument(view, 1, "respondWithNewView");
            if (!ArrayBuffer.isView(view)) {
              throw new TypeError("You can only respond with array buffer views");
            }
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
          }
        }
        Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
          respond: { enumerable: true },
          respondWithNewView: { enumerable: true },
          view: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBRequest",
            configurable: true
          });
        }
        class ReadableByteStreamController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get byobRequest() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("byobRequest");
            }
            return ReadableByteStreamControllerGetBYOBRequest(this);
          }
          get desiredSize() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("desiredSize");
            }
            return ReadableByteStreamControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("close");
            }
            if (this._closeRequested) {
              throw new TypeError("The stream has already been closed; do not close it again!");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
            }
            ReadableByteStreamControllerClose(this);
          }
          enqueue(chunk) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("enqueue");
            }
            assertRequiredArgument(chunk, 1, "enqueue");
            if (!ArrayBuffer.isView(chunk)) {
              throw new TypeError("chunk must be an array buffer view");
            }
            if (chunk.byteLength === 0) {
              throw new TypeError("chunk must have non-zero byteLength");
            }
            if (chunk.buffer.byteLength === 0) {
              throw new TypeError(`chunk's buffer must have non-zero byteLength`);
            }
            if (this._closeRequested) {
              throw new TypeError("stream is closed or draining");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("error");
            }
            ReadableByteStreamControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ReadableByteStreamControllerClearPendingPullIntos(this);
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
              const entry3 = this._queue.shift();
              this._queueTotalSize -= entry3.byteLength;
              ReadableByteStreamControllerHandleQueueDrain(this);
              const view = new Uint8Array(entry3.buffer, entry3.byteOffset, entry3.byteLength);
              readRequest._chunkSteps(view);
              return;
            }
            const autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== void 0) {
              let buffer;
              try {
                buffer = new ArrayBuffer(autoAllocateChunkSize);
              } catch (bufferE) {
                readRequest._errorSteps(bufferE);
                return;
              }
              const pullIntoDescriptor = {
                buffer,
                bufferByteLength: autoAllocateChunkSize,
                byteOffset: 0,
                byteLength: autoAllocateChunkSize,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: "default"
              };
              this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
          }
        }
        Object.defineProperties(ReadableByteStreamController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          byobRequest: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableByteStreamController",
            configurable: true
          });
        }
        function IsReadableByteStreamController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
            return false;
          }
          return x2 instanceof ReadableByteStreamController;
        }
        function IsReadableStreamBYOBRequest(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBRequest;
        }
        function ReadableByteStreamControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableByteStreamControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableByteStreamControllerError(controller, e2);
          });
        }
        function ReadableByteStreamControllerClearPendingPullIntos(controller) {
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          controller._pendingPullIntos = new SimpleQueue();
        }
        function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
          let done = false;
          if (stream._state === "closed") {
            done = true;
          }
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          if (pullIntoDescriptor.readerType === "default") {
            ReadableStreamFulfillReadRequest(stream, filledView, done);
          } else {
            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
          }
        }
        function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
          const bytesFilled = pullIntoDescriptor.bytesFilled;
          const elementSize = pullIntoDescriptor.elementSize;
          return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
        }
        function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
          controller._queue.push({ buffer, byteOffset, byteLength });
          controller._queueTotalSize += byteLength;
        }
        function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
          const elementSize = pullIntoDescriptor.elementSize;
          const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
          const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
          const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
          const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
          let totalBytesToCopyRemaining = maxBytesToCopy;
          let ready = false;
          if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
          }
          const queue = controller._queue;
          while (totalBytesToCopyRemaining > 0) {
            const headOfQueue = queue.peek();
            const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
            const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
            if (headOfQueue.byteLength === bytesToCopy) {
              queue.shift();
            } else {
              headOfQueue.byteOffset += bytesToCopy;
              headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
            totalBytesToCopyRemaining -= bytesToCopy;
          }
          return ready;
        }
        function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
          pullIntoDescriptor.bytesFilled += size;
        }
        function ReadableByteStreamControllerHandleQueueDrain(controller) {
          if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
          } else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }
        function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
          if (controller._byobRequest === null) {
            return;
          }
          controller._byobRequest._associatedReadableByteStreamController = void 0;
          controller._byobRequest._view = null;
          controller._byobRequest = null;
        }
        function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
          while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
              return;
            }
            const pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
          const stream = controller._controlledReadableByteStream;
          let elementSize = 1;
          if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
          }
          const ctor = view.constructor;
          const buffer = TransferArrayBuffer(view.buffer);
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: buffer.byteLength,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize,
            viewConstructor: ctor,
            readerType: "byob"
          };
          if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
            return;
          }
          if (stream._state === "closed") {
            const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
            readIntoRequest._closeSteps(emptyView);
            return;
          }
          if (controller._queueTotalSize > 0) {
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
              ReadableByteStreamControllerHandleQueueDrain(controller);
              readIntoRequest._chunkSteps(filledView);
              return;
            }
            if (controller._closeRequested) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              readIntoRequest._errorSteps(e2);
              return;
            }
          }
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
          const stream = controller._controlledReadableByteStream;
          if (ReadableStreamHasBYOBReader(stream)) {
            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
              const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
          if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            return;
          }
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
          if (remainderSize > 0) {
            const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
          }
          pullIntoDescriptor.bytesFilled -= remainderSize;
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        }
        function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            ReadableByteStreamControllerRespondInClosedState(controller);
          } else {
            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerShiftPendingPullInto(controller) {
          const descriptor = controller._pendingPullIntos.shift();
          return descriptor;
        }
        function ReadableByteStreamControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return false;
          }
          if (controller._closeRequested) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableByteStreamControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
        }
        function ReadableByteStreamControllerClose(controller) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
          }
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              throw e2;
            }
          }
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
        function ReadableByteStreamControllerEnqueue(controller, chunk) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          const buffer = chunk.buffer;
          const byteOffset = chunk.byteOffset;
          const byteLength = chunk.byteLength;
          const transferredBuffer = TransferArrayBuffer(buffer);
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (IsDetachedBuffer(firstPendingPullInto.buffer))
              ;
            firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          if (ReadableStreamHasDefaultReader(stream)) {
            if (ReadableStreamGetNumReadRequests(stream) === 0) {
              ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            } else {
              if (controller._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
              }
              const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
              ReadableStreamFulfillReadRequest(stream, transferredView, false);
            }
          } else if (ReadableStreamHasBYOBReader(stream)) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          } else {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerError(controller, e2) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return;
          }
          ReadableByteStreamControllerClearPendingPullIntos(controller);
          ResetQueue(controller);
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableByteStreamControllerGetBYOBRequest(controller) {
          if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
            const firstDescriptor = controller._pendingPullIntos.peek();
            const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
            const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
            controller._byobRequest = byobRequest;
          }
          return controller._byobRequest;
        }
        function ReadableByteStreamControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableByteStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableByteStreamControllerRespond(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (bytesWritten !== 0) {
              throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
            }
          } else {
            if (bytesWritten === 0) {
              throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
            }
            if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
              throw new RangeError("bytesWritten out of range");
            }
          }
          firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
          ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
        }
        function ReadableByteStreamControllerRespondWithNewView(controller, view) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (view.byteLength !== 0) {
              throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
            }
          } else {
            if (view.byteLength === 0) {
              throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
            }
          }
          if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
            throw new RangeError("The region specified by view does not match byobRequest");
          }
          if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
            throw new RangeError("The buffer of view has different capacity than byobRequest");
          }
          if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
            throw new RangeError("The region specified by view is larger than byobRequest");
          }
          const viewByteLength = view.byteLength;
          firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
          ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
        }
        function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
          controller._controlledReadableByteStream = stream;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._byobRequest = null;
          controller._queue = controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._closeRequested = false;
          controller._started = false;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          controller._autoAllocateChunkSize = autoAllocateChunkSize;
          controller._pendingPullIntos = new SimpleQueue();
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableByteStreamControllerError(controller, r2);
          });
        }
        function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
          const controller = Object.create(ReadableByteStreamController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingByteSource.start !== void 0) {
            startAlgorithm = () => underlyingByteSource.start(controller);
          }
          if (underlyingByteSource.pull !== void 0) {
            pullAlgorithm = () => underlyingByteSource.pull(controller);
          }
          if (underlyingByteSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
          }
          const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
          if (autoAllocateChunkSize === 0) {
            throw new TypeError("autoAllocateChunkSize must be greater than 0");
          }
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
        }
        function SetUpReadableStreamBYOBRequest(request, controller, view) {
          request._associatedReadableByteStreamController = controller;
          request._view = view;
        }
        function byobRequestBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
        }
        function byteStreamControllerBrandCheckException(name) {
          return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
        }
        function AcquireReadableStreamBYOBReader(stream) {
          return new ReadableStreamBYOBReader(stream);
        }
        function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
          stream._reader._readIntoRequests.push(readIntoRequest);
        }
        function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readIntoRequest = reader._readIntoRequests.shift();
          if (done) {
            readIntoRequest._closeSteps(chunk);
          } else {
            readIntoRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadIntoRequests(stream) {
          return stream._reader._readIntoRequests.length;
        }
        function ReadableStreamHasBYOBReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamBYOBReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamBYOBReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            if (!IsReadableByteStreamController(stream._readableStreamController)) {
              throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readIntoRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read(view) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("read"));
            }
            if (!ArrayBuffer.isView(view)) {
              return promiseRejectedWith(new TypeError("view must be an array buffer view"));
            }
            if (view.byteLength === 0) {
              return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
            }
            if (view.buffer.byteLength === 0) {
              return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readIntoRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamBYOBReader(this)) {
              throw byobReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readIntoRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamBYOBReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBReader",
            configurable: true
          });
        }
        function IsReadableStreamBYOBReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBReader;
        }
        function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "errored") {
            readIntoRequest._errorSteps(stream._storedError);
          } else {
            ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
          }
        }
        function byobReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
        }
        function ExtractHighWaterMark(strategy, defaultHWM) {
          const { highWaterMark } = strategy;
          if (highWaterMark === void 0) {
            return defaultHWM;
          }
          if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError("Invalid highWaterMark");
          }
          return highWaterMark;
        }
        function ExtractSizeAlgorithm(strategy) {
          const { size } = strategy;
          if (!size) {
            return () => 1;
          }
          return size;
        }
        function convertQueuingStrategy(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          const size = init2 === null || init2 === void 0 ? void 0 : init2.size;
          return {
            highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
            size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
          };
        }
        function convertQueuingStrategySize(fn, context) {
          assertFunction(fn, context);
          return (chunk) => convertUnrestrictedDouble(fn(chunk));
        }
        function convertUnderlyingSink(original, context) {
          assertDictionary(original, context);
          const abort = original === null || original === void 0 ? void 0 : original.abort;
          const close = original === null || original === void 0 ? void 0 : original.close;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          const write = original === null || original === void 0 ? void 0 : original.write;
          return {
            abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
            close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
            write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
            type
          };
        }
        function convertUnderlyingSinkAbortCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSinkCloseCallback(fn, original, context) {
          assertFunction(fn, context);
          return () => promiseCall(fn, original, []);
        }
        function convertUnderlyingSinkStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertUnderlyingSinkWriteCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        function assertWritableStream(x2, context) {
          if (!IsWritableStream(x2)) {
            throw new TypeError(`${context} is not a WritableStream.`);
          }
        }
        function isAbortSignal2(value) {
          if (typeof value !== "object" || value === null) {
            return false;
          }
          try {
            return typeof value.aborted === "boolean";
          } catch (_a4) {
            return false;
          }
        }
        const supportsAbortController = typeof AbortController === "function";
        function createAbortController() {
          if (supportsAbortController) {
            return new AbortController();
          }
          return void 0;
        }
        class WritableStream {
          constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
            if (rawUnderlyingSink === void 0) {
              rawUnderlyingSink = null;
            } else {
              assertObject(rawUnderlyingSink, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
            InitializeWritableStream(this);
            const type = underlyingSink.type;
            if (type !== void 0) {
              throw new RangeError("Invalid type is specified");
            }
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
          }
          get locked() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("locked");
            }
            return IsWritableStreamLocked(this);
          }
          abort(reason = void 0) {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("abort"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
            }
            return WritableStreamAbort(this, reason);
          }
          close() {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("close"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamClose(this);
          }
          getWriter() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("getWriter");
            }
            return AcquireWritableStreamDefaultWriter(this);
          }
        }
        Object.defineProperties(WritableStream.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          getWriter: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStream",
            configurable: true
          });
        }
        function AcquireWritableStreamDefaultWriter(stream) {
          return new WritableStreamDefaultWriter(stream);
        }
        function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(WritableStream.prototype);
          InitializeWritableStream(stream);
          const controller = Object.create(WritableStreamDefaultController.prototype);
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function InitializeWritableStream(stream) {
          stream._state = "writable";
          stream._storedError = void 0;
          stream._writer = void 0;
          stream._writableStreamController = void 0;
          stream._writeRequests = new SimpleQueue();
          stream._inFlightWriteRequest = void 0;
          stream._closeRequest = void 0;
          stream._inFlightCloseRequest = void 0;
          stream._pendingAbortRequest = void 0;
          stream._backpressure = false;
        }
        function IsWritableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
            return false;
          }
          return x2 instanceof WritableStream;
        }
        function IsWritableStreamLocked(stream) {
          if (stream._writer === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamAbort(stream, reason) {
          var _a4;
          if (stream._state === "closed" || stream._state === "errored") {
            return promiseResolvedWith(void 0);
          }
          stream._writableStreamController._abortReason = reason;
          (_a4 = stream._writableStreamController._abortController) === null || _a4 === void 0 ? void 0 : _a4.abort();
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseResolvedWith(void 0);
          }
          if (stream._pendingAbortRequest !== void 0) {
            return stream._pendingAbortRequest._promise;
          }
          let wasAlreadyErroring = false;
          if (state === "erroring") {
            wasAlreadyErroring = true;
            reason = void 0;
          }
          const promise = newPromise((resolve2, reject) => {
            stream._pendingAbortRequest = {
              _promise: void 0,
              _resolve: resolve2,
              _reject: reject,
              _reason: reason,
              _wasAlreadyErroring: wasAlreadyErroring
            };
          });
          stream._pendingAbortRequest._promise = promise;
          if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream, reason);
          }
          return promise;
        }
        function WritableStreamClose(stream) {
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
          }
          const promise = newPromise((resolve2, reject) => {
            const closeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._closeRequest = closeRequest;
          });
          const writer = stream._writer;
          if (writer !== void 0 && stream._backpressure && state === "writable") {
            defaultWriterReadyPromiseResolve(writer);
          }
          WritableStreamDefaultControllerClose(stream._writableStreamController);
          return promise;
        }
        function WritableStreamAddWriteRequest(stream) {
          const promise = newPromise((resolve2, reject) => {
            const writeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._writeRequests.push(writeRequest);
          });
          return promise;
        }
        function WritableStreamDealWithRejection(stream, error2) {
          const state = stream._state;
          if (state === "writable") {
            WritableStreamStartErroring(stream, error2);
            return;
          }
          WritableStreamFinishErroring(stream);
        }
        function WritableStreamStartErroring(stream, reason) {
          const controller = stream._writableStreamController;
          stream._state = "erroring";
          stream._storedError = reason;
          const writer = stream._writer;
          if (writer !== void 0) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
          }
          if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
            WritableStreamFinishErroring(stream);
          }
        }
        function WritableStreamFinishErroring(stream) {
          stream._state = "errored";
          stream._writableStreamController[ErrorSteps]();
          const storedError = stream._storedError;
          stream._writeRequests.forEach((writeRequest) => {
            writeRequest._reject(storedError);
          });
          stream._writeRequests = new SimpleQueue();
          if (stream._pendingAbortRequest === void 0) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const abortRequest = stream._pendingAbortRequest;
          stream._pendingAbortRequest = void 0;
          if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
          uponPromise(promise, () => {
            abortRequest._resolve();
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          }, (reason) => {
            abortRequest._reject(reason);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          });
        }
        function WritableStreamFinishInFlightWrite(stream) {
          stream._inFlightWriteRequest._resolve(void 0);
          stream._inFlightWriteRequest = void 0;
        }
        function WritableStreamFinishInFlightWriteWithError(stream, error2) {
          stream._inFlightWriteRequest._reject(error2);
          stream._inFlightWriteRequest = void 0;
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamFinishInFlightClose(stream) {
          stream._inFlightCloseRequest._resolve(void 0);
          stream._inFlightCloseRequest = void 0;
          const state = stream._state;
          if (state === "erroring") {
            stream._storedError = void 0;
            if (stream._pendingAbortRequest !== void 0) {
              stream._pendingAbortRequest._resolve();
              stream._pendingAbortRequest = void 0;
            }
          }
          stream._state = "closed";
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseResolve(writer);
          }
        }
        function WritableStreamFinishInFlightCloseWithError(stream, error2) {
          stream._inFlightCloseRequest._reject(error2);
          stream._inFlightCloseRequest = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._reject(error2);
            stream._pendingAbortRequest = void 0;
          }
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamCloseQueuedOrInFlight(stream) {
          if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamHasOperationMarkedInFlight(stream) {
          if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamMarkCloseRequestInFlight(stream) {
          stream._inFlightCloseRequest = stream._closeRequest;
          stream._closeRequest = void 0;
        }
        function WritableStreamMarkFirstWriteRequestInFlight(stream) {
          stream._inFlightWriteRequest = stream._writeRequests.shift();
        }
        function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
          if (stream._closeRequest !== void 0) {
            stream._closeRequest._reject(stream._storedError);
            stream._closeRequest = void 0;
          }
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseReject(writer, stream._storedError);
          }
        }
        function WritableStreamUpdateBackpressure(stream, backpressure) {
          const writer = stream._writer;
          if (writer !== void 0 && backpressure !== stream._backpressure) {
            if (backpressure) {
              defaultWriterReadyPromiseReset(writer);
            } else {
              defaultWriterReadyPromiseResolve(writer);
            }
          }
          stream._backpressure = backpressure;
        }
        class WritableStreamDefaultWriter {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
            assertWritableStream(stream, "First parameter");
            if (IsWritableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive writing by another writer");
            }
            this._ownerWritableStream = stream;
            stream._writer = this;
            const state = stream._state;
            if (state === "writable") {
              if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
                defaultWriterReadyPromiseInitialize(this);
              } else {
                defaultWriterReadyPromiseInitializeAsResolved(this);
              }
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "erroring") {
              defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "closed") {
              defaultWriterReadyPromiseInitializeAsResolved(this);
              defaultWriterClosedPromiseInitializeAsResolved(this);
            } else {
              const storedError = stream._storedError;
              defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
              defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
          }
          get closed() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          get desiredSize() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("desiredSize");
            }
            if (this._ownerWritableStream === void 0) {
              throw defaultWriterLockException("desiredSize");
            }
            return WritableStreamDefaultWriterGetDesiredSize(this);
          }
          get ready() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
            }
            return this._readyPromise;
          }
          abort(reason = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("abort"));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
          }
          close() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("close"));
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("close"));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamDefaultWriterClose(this);
          }
          releaseLock() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("releaseLock");
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return;
            }
            WritableStreamDefaultWriterRelease(this);
          }
          write(chunk = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("write"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("write to"));
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
          }
        }
        Object.defineProperties(WritableStreamDefaultWriter.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          releaseLock: { enumerable: true },
          write: { enumerable: true },
          closed: { enumerable: true },
          desiredSize: { enumerable: true },
          ready: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultWriter",
            configurable: true
          });
        }
        function IsWritableStreamDefaultWriter(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultWriter;
        }
        function WritableStreamDefaultWriterAbort(writer, reason) {
          const stream = writer._ownerWritableStream;
          return WritableStreamAbort(stream, reason);
        }
        function WritableStreamDefaultWriterClose(writer) {
          const stream = writer._ownerWritableStream;
          return WritableStreamClose(stream);
        }
        function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          return WritableStreamDefaultWriterClose(writer);
        }
        function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
          if (writer._closedPromiseState === "pending") {
            defaultWriterClosedPromiseReject(writer, error2);
          } else {
            defaultWriterClosedPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
          if (writer._readyPromiseState === "pending") {
            defaultWriterReadyPromiseReject(writer, error2);
          } else {
            defaultWriterReadyPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterGetDesiredSize(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (state === "errored" || state === "erroring") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
        }
        function WritableStreamDefaultWriterRelease(writer) {
          const stream = writer._ownerWritableStream;
          const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
          WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
          stream._writer = void 0;
          writer._ownerWritableStream = void 0;
        }
        function WritableStreamDefaultWriterWrite(writer, chunk) {
          const stream = writer._ownerWritableStream;
          const controller = stream._writableStreamController;
          const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
          if (stream !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          const state = stream._state;
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
          }
          if (state === "erroring") {
            return promiseRejectedWith(stream._storedError);
          }
          const promise = WritableStreamAddWriteRequest(stream);
          WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
          return promise;
        }
        const closeSentinel = {};
        class WritableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get abortReason() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("abortReason");
            }
            return this._abortReason;
          }
          get signal() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("signal");
            }
            if (this._abortController === void 0) {
              throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
            }
            return this._abortController.signal;
          }
          error(e2 = void 0) {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("error");
            }
            const state = this._controlledWritableStream._state;
            if (state !== "writable") {
              return;
            }
            WritableStreamDefaultControllerError(this, e2);
          }
          [AbortSteps](reason) {
            const result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [ErrorSteps]() {
            ResetQueue(this);
          }
        }
        Object.defineProperties(WritableStreamDefaultController.prototype, {
          abortReason: { enumerable: true },
          signal: { enumerable: true },
          error: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultController",
            configurable: true
          });
        }
        function IsWritableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultController;
        }
        function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledWritableStream = stream;
          stream._writableStreamController = controller;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._abortReason = void 0;
          controller._abortController = createAbortController();
          controller._started = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._writeAlgorithm = writeAlgorithm;
          controller._closeAlgorithm = closeAlgorithm;
          controller._abortAlgorithm = abortAlgorithm;
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
          const startResult = startAlgorithm();
          const startPromise = promiseResolvedWith(startResult);
          uponPromise(startPromise, () => {
            controller._started = true;
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (r2) => {
            controller._started = true;
            WritableStreamDealWithRejection(stream, r2);
          });
        }
        function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(WritableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let writeAlgorithm = () => promiseResolvedWith(void 0);
          let closeAlgorithm = () => promiseResolvedWith(void 0);
          let abortAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSink.start !== void 0) {
            startAlgorithm = () => underlyingSink.start(controller);
          }
          if (underlyingSink.write !== void 0) {
            writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
          }
          if (underlyingSink.close !== void 0) {
            closeAlgorithm = () => underlyingSink.close();
          }
          if (underlyingSink.abort !== void 0) {
            abortAlgorithm = (reason) => underlyingSink.abort(reason);
          }
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function WritableStreamDefaultControllerClearAlgorithms(controller) {
          controller._writeAlgorithm = void 0;
          controller._closeAlgorithm = void 0;
          controller._abortAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function WritableStreamDefaultControllerClose(controller) {
          EnqueueValueWithSize(controller, closeSentinel, 0);
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
          try {
            return controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
            return 1;
          }
        }
        function WritableStreamDefaultControllerGetDesiredSize(controller) {
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
          }
          const stream = controller._controlledWritableStream;
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
          const stream = controller._controlledWritableStream;
          if (!controller._started) {
            return;
          }
          if (stream._inFlightWriteRequest !== void 0) {
            return;
          }
          const state = stream._state;
          if (state === "erroring") {
            WritableStreamFinishErroring(stream);
            return;
          }
          if (controller._queue.length === 0) {
            return;
          }
          const value = PeekQueueValue(controller);
          if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
          } else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
          }
        }
        function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
          if (controller._controlledWritableStream._state === "writable") {
            WritableStreamDefaultControllerError(controller, error2);
          }
        }
        function WritableStreamDefaultControllerProcessClose(controller) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkCloseRequestInFlight(stream);
          DequeueValue(controller);
          const sinkClosePromise = controller._closeAlgorithm();
          WritableStreamDefaultControllerClearAlgorithms(controller);
          uponPromise(sinkClosePromise, () => {
            WritableStreamFinishInFlightClose(stream);
          }, (reason) => {
            WritableStreamFinishInFlightCloseWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkFirstWriteRequestInFlight(stream);
          const sinkWritePromise = controller._writeAlgorithm(chunk);
          uponPromise(sinkWritePromise, () => {
            WritableStreamFinishInFlightWrite(stream);
            const state = stream._state;
            DequeueValue(controller);
            if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
              const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
              WritableStreamUpdateBackpressure(stream, backpressure);
            }
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (reason) => {
            if (stream._state === "writable") {
              WritableStreamDefaultControllerClearAlgorithms(controller);
            }
            WritableStreamFinishInFlightWriteWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerGetBackpressure(controller) {
          const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
          return desiredSize <= 0;
        }
        function WritableStreamDefaultControllerError(controller, error2) {
          const stream = controller._controlledWritableStream;
          WritableStreamDefaultControllerClearAlgorithms(controller);
          WritableStreamStartErroring(stream, error2);
        }
        function streamBrandCheckException$2(name) {
          return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
        }
        function defaultControllerBrandCheckException$2(name) {
          return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
        }
        function defaultWriterBrandCheckException(name) {
          return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
        }
        function defaultWriterLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released writer");
        }
        function defaultWriterClosedPromiseInitialize(writer) {
          writer._closedPromise = newPromise((resolve2, reject) => {
            writer._closedPromise_resolve = resolve2;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = "pending";
          });
        }
        function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseReject(writer, reason);
        }
        function defaultWriterClosedPromiseInitializeAsResolved(writer) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseResolve(writer);
        }
        function defaultWriterClosedPromiseReject(writer, reason) {
          if (writer._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._closedPromise);
          writer._closedPromise_reject(reason);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "rejected";
        }
        function defaultWriterClosedPromiseResetToRejected(writer, reason) {
          defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterClosedPromiseResolve(writer) {
          if (writer._closedPromise_resolve === void 0) {
            return;
          }
          writer._closedPromise_resolve(void 0);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "resolved";
        }
        function defaultWriterReadyPromiseInitialize(writer) {
          writer._readyPromise = newPromise((resolve2, reject) => {
            writer._readyPromise_resolve = resolve2;
            writer._readyPromise_reject = reject;
          });
          writer._readyPromiseState = "pending";
        }
        function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseReject(writer, reason);
        }
        function defaultWriterReadyPromiseInitializeAsResolved(writer) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseResolve(writer);
        }
        function defaultWriterReadyPromiseReject(writer, reason) {
          if (writer._readyPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._readyPromise);
          writer._readyPromise_reject(reason);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "rejected";
        }
        function defaultWriterReadyPromiseReset(writer) {
          defaultWriterReadyPromiseInitialize(writer);
        }
        function defaultWriterReadyPromiseResetToRejected(writer, reason) {
          defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterReadyPromiseResolve(writer) {
          if (writer._readyPromise_resolve === void 0) {
            return;
          }
          writer._readyPromise_resolve(void 0);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "fulfilled";
        }
        const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
        function isDOMExceptionConstructor(ctor) {
          if (!(typeof ctor === "function" || typeof ctor === "object")) {
            return false;
          }
          try {
            new ctor();
            return true;
          } catch (_a4) {
            return false;
          }
        }
        function createDOMExceptionPolyfill() {
          const ctor = function DOMException2(message, name) {
            this.message = message || "";
            this.name = name || "Error";
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
            }
          };
          ctor.prototype = Object.create(Error.prototype);
          Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
          return ctor;
        }
        const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
        function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
          const reader = AcquireReadableStreamDefaultReader(source);
          const writer = AcquireWritableStreamDefaultWriter(dest);
          source._disturbed = true;
          let shuttingDown = false;
          let currentWrite = promiseResolvedWith(void 0);
          return newPromise((resolve2, reject) => {
            let abortAlgorithm;
            if (signal !== void 0) {
              abortAlgorithm = () => {
                const error2 = new DOMException$1("Aborted", "AbortError");
                const actions = [];
                if (!preventAbort) {
                  actions.push(() => {
                    if (dest._state === "writable") {
                      return WritableStreamAbort(dest, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                if (!preventCancel) {
                  actions.push(() => {
                    if (source._state === "readable") {
                      return ReadableStreamCancel(source, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
              };
              if (signal.aborted) {
                abortAlgorithm();
                return;
              }
              signal.addEventListener("abort", abortAlgorithm);
            }
            function pipeLoop() {
              return newPromise((resolveLoop, rejectLoop) => {
                function next(done) {
                  if (done) {
                    resolveLoop();
                  } else {
                    PerformPromiseThen(pipeStep(), next, rejectLoop);
                  }
                }
                next(false);
              });
            }
            function pipeStep() {
              if (shuttingDown) {
                return promiseResolvedWith(true);
              }
              return PerformPromiseThen(writer._readyPromise, () => {
                return newPromise((resolveRead, rejectRead) => {
                  ReadableStreamDefaultReaderRead(reader, {
                    _chunkSteps: (chunk) => {
                      currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop3);
                      resolveRead(false);
                    },
                    _closeSteps: () => resolveRead(true),
                    _errorSteps: rejectRead
                  });
                });
              });
            }
            isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
              if (!preventAbort) {
                shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesClosed(source, reader._closedPromise, () => {
              if (!preventClose) {
                shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
              } else {
                shutdown();
              }
            });
            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
              const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
              } else {
                shutdown(true, destClosed);
              }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
              const oldCurrentWrite = currentWrite;
              return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
            }
            function isOrBecomesErrored(stream, promise, action) {
              if (stream._state === "errored") {
                action(stream._storedError);
              } else {
                uponRejection(promise, action);
              }
            }
            function isOrBecomesClosed(stream, promise, action) {
              if (stream._state === "closed") {
                action();
              } else {
                uponFulfillment(promise, action);
              }
            }
            function shutdownWithAction(action, originalIsError, originalError) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), doTheRest);
              } else {
                doTheRest();
              }
              function doTheRest() {
                uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              }
            }
            function shutdown(isError, error2) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
              } else {
                finalize(isError, error2);
              }
            }
            function finalize(isError, error2) {
              WritableStreamDefaultWriterRelease(writer);
              ReadableStreamReaderGenericRelease(reader);
              if (signal !== void 0) {
                signal.removeEventListener("abort", abortAlgorithm);
              }
              if (isError) {
                reject(error2);
              } else {
                resolve2(void 0);
              }
            }
          });
        }
        class ReadableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("desiredSize");
            }
            return ReadableStreamDefaultControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("close");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits close");
            }
            ReadableStreamDefaultControllerClose(this);
          }
          enqueue(chunk = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("enqueue");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits enqueue");
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("error");
            }
            ReadableStreamDefaultControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableStream;
            if (this._queue.length > 0) {
              const chunk = DequeueValue(this);
              if (this._closeRequested && this._queue.length === 0) {
                ReadableStreamDefaultControllerClearAlgorithms(this);
                ReadableStreamClose(stream);
              } else {
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
              }
              readRequest._chunkSteps(chunk);
            } else {
              ReadableStreamAddReadRequest(stream, readRequest);
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
          }
        }
        Object.defineProperties(ReadableStreamDefaultController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultController",
            configurable: true
          });
        }
        function IsReadableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultController;
        }
        function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableStreamDefaultControllerError(controller, e2);
          });
        }
        function ReadableStreamDefaultControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableStream;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableStreamDefaultControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function ReadableStreamDefaultControllerClose(controller) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          controller._closeRequested = true;
          if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream);
          }
        }
        function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            ReadableStreamFulfillReadRequest(stream, chunk, false);
          } else {
            let chunkSize;
            try {
              chunkSize = controller._strategySizeAlgorithm(chunk);
            } catch (chunkSizeE) {
              ReadableStreamDefaultControllerError(controller, chunkSizeE);
              throw chunkSizeE;
            }
            try {
              EnqueueValueWithSize(controller, chunk, chunkSize);
            } catch (enqueueE) {
              ReadableStreamDefaultControllerError(controller, enqueueE);
              throw enqueueE;
            }
          }
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
        function ReadableStreamDefaultControllerError(controller, e2) {
          const stream = controller._controlledReadableStream;
          if (stream._state !== "readable") {
            return;
          }
          ResetQueue(controller);
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableStreamDefaultControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableStreamDefaultControllerHasBackpressure(controller) {
          if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
          }
          return true;
        }
        function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
          const state = controller._controlledReadableStream._state;
          if (!controller._closeRequested && state === "readable") {
            return true;
          }
          return false;
        }
        function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledReadableStream = stream;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._started = false;
          controller._closeRequested = false;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableStreamDefaultControllerError(controller, r2);
          });
        }
        function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSource.start !== void 0) {
            startAlgorithm = () => underlyingSource.start(controller);
          }
          if (underlyingSource.pull !== void 0) {
            pullAlgorithm = () => underlyingSource.pull(controller);
          }
          if (underlyingSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
          }
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function defaultControllerBrandCheckException$1(name) {
          return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
        }
        function ReadableStreamTee(stream, cloneForBranch2) {
          if (IsReadableByteStreamController(stream._readableStreamController)) {
            return ReadableByteStreamTee(stream);
          }
          return ReadableStreamDefaultTee(stream);
        }
        function ReadableStreamDefaultTee(stream, cloneForBranch2) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgain = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function pullAlgorithm() {
            if (reading) {
              readAgain = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask2(() => {
                  readAgain = false;
                  const chunk1 = chunk;
                  const chunk2 = chunk;
                  if (!canceled1) {
                    ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgain) {
                    pullAlgorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
          }
          branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
          branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
          uponRejection(reader._closedPromise, (r2) => {
            ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
            ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
          return [branch1, branch2];
        }
        function ReadableByteStreamTee(stream) {
          let reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgainForBranch1 = false;
          let readAgainForBranch2 = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function forwardReaderError(thisReader) {
            uponRejection(thisReader._closedPromise, (r2) => {
              if (thisReader !== reader) {
                return;
              }
              ReadableByteStreamControllerError(branch1._readableStreamController, r2);
              ReadableByteStreamControllerError(branch2._readableStreamController, r2);
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            });
          }
          function pullWithDefaultReader() {
            if (IsReadableStreamBYOBReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamDefaultReader(stream);
              forwardReaderError(reader);
            }
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask2(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const chunk1 = chunk;
                  let chunk2 = chunk;
                  if (!canceled1 && !canceled2) {
                    try {
                      chunk2 = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                  }
                  if (!canceled1) {
                    ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableByteStreamControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerClose(branch2._readableStreamController);
                }
                if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
                }
                if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
          }
          function pullWithBYOBReader(view, forBranch2) {
            if (IsReadableStreamDefaultReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamBYOBReader(stream);
              forwardReaderError(reader);
            }
            const byobBranch = forBranch2 ? branch2 : branch1;
            const otherBranch = forBranch2 ? branch1 : branch2;
            const readIntoRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask2(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const byobCanceled = forBranch2 ? canceled2 : canceled1;
                  const otherCanceled = forBranch2 ? canceled1 : canceled2;
                  if (!otherCanceled) {
                    let clonedChunk;
                    try {
                      clonedChunk = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                    if (!byobCanceled) {
                      ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                    }
                    ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                  } else if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: (chunk) => {
                reading = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!byobCanceled) {
                  ReadableByteStreamControllerClose(byobBranch._readableStreamController);
                }
                if (!otherCanceled) {
                  ReadableByteStreamControllerClose(otherBranch._readableStreamController);
                }
                if (chunk !== void 0) {
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                    ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                  }
                }
                if (!byobCanceled || !otherCanceled) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
          }
          function pull1Algorithm() {
            if (reading) {
              readAgainForBranch1 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, false);
            }
            return promiseResolvedWith(void 0);
          }
          function pull2Algorithm() {
            if (reading) {
              readAgainForBranch2 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, true);
            }
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
            return;
          }
          branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
          branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
          forwardReaderError(reader);
          return [branch1, branch2];
        }
        function convertUnderlyingDefaultOrByteSource(source, context) {
          assertDictionary(source, context);
          const original = source;
          const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
          const cancel = original === null || original === void 0 ? void 0 : original.cancel;
          const pull = original === null || original === void 0 ? void 0 : original.pull;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          return {
            autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
            cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
            pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
            type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
          };
        }
        function convertUnderlyingSourceCancelCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSourcePullCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertUnderlyingSourceStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertReadableStreamType(type, context) {
          type = `${type}`;
          if (type !== "bytes") {
            throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
          }
          return type;
        }
        function convertReaderOptions(options, context) {
          assertDictionary(options, context);
          const mode = options === null || options === void 0 ? void 0 : options.mode;
          return {
            mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
          };
        }
        function convertReadableStreamReaderMode(mode, context) {
          mode = `${mode}`;
          if (mode !== "byob") {
            throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
          }
          return mode;
        }
        function convertIteratorOptions(options, context) {
          assertDictionary(options, context);
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          return { preventCancel: Boolean(preventCancel) };
        }
        function convertPipeOptions(options, context) {
          assertDictionary(options, context);
          const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
          const signal = options === null || options === void 0 ? void 0 : options.signal;
          if (signal !== void 0) {
            assertAbortSignal(signal, `${context} has member 'signal' that`);
          }
          return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal
          };
        }
        function assertAbortSignal(signal, context) {
          if (!isAbortSignal2(signal)) {
            throw new TypeError(`${context} is not an AbortSignal.`);
          }
        }
        function convertReadableWritablePair(pair, context) {
          assertDictionary(pair, context);
          const readable2 = pair === null || pair === void 0 ? void 0 : pair.readable;
          assertRequiredField(readable2, "readable", "ReadableWritablePair");
          assertReadableStream(readable2, `${context} has member 'readable' that`);
          const writable2 = pair === null || pair === void 0 ? void 0 : pair.writable;
          assertRequiredField(writable2, "writable", "ReadableWritablePair");
          assertWritableStream(writable2, `${context} has member 'writable' that`);
          return { readable: readable2, writable: writable2 };
        }
        class ReadableStream2 {
          constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
            if (rawUnderlyingSource === void 0) {
              rawUnderlyingSource = null;
            } else {
              assertObject(rawUnderlyingSource, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
            InitializeReadableStream(this);
            if (underlyingSource.type === "bytes") {
              if (strategy.size !== void 0) {
                throw new RangeError("The strategy for a byte stream cannot have a size function");
              }
              const highWaterMark = ExtractHighWaterMark(strategy, 0);
              SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
            } else {
              const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
              const highWaterMark = ExtractHighWaterMark(strategy, 1);
              SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
            }
          }
          get locked() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("locked");
            }
            return IsReadableStreamLocked(this);
          }
          cancel(reason = void 0) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("cancel"));
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
            }
            return ReadableStreamCancel(this, reason);
          }
          getReader(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("getReader");
            }
            const options = convertReaderOptions(rawOptions, "First parameter");
            if (options.mode === void 0) {
              return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
          }
          pipeThrough(rawTransform, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("pipeThrough");
            }
            assertRequiredArgument(rawTransform, 1, "pipeThrough");
            const transform = convertReadableWritablePair(rawTransform, "First parameter");
            const options = convertPipeOptions(rawOptions, "Second parameter");
            if (IsReadableStreamLocked(this)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
            }
            if (IsWritableStreamLocked(transform.writable)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
            }
            const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
          }
          pipeTo(destination, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
            }
            if (destination === void 0) {
              return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
            }
            if (!IsWritableStream(destination)) {
              return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
            }
            let options;
            try {
              options = convertPipeOptions(rawOptions, "Second parameter");
            } catch (e2) {
              return promiseRejectedWith(e2);
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
            }
            if (IsWritableStreamLocked(destination)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
            }
            return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          }
          tee() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("tee");
            }
            const branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
          }
          values(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("values");
            }
            const options = convertIteratorOptions(rawOptions, "First parameter");
            return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
          }
        }
        Object.defineProperties(ReadableStream2.prototype, {
          cancel: { enumerable: true },
          getReader: { enumerable: true },
          pipeThrough: { enumerable: true },
          pipeTo: { enumerable: true },
          tee: { enumerable: true },
          values: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStream",
            configurable: true
          });
        }
        if (typeof SymbolPolyfill.asyncIterator === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
            value: ReadableStream2.prototype.values,
            writable: true,
            configurable: true
          });
        }
        function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableByteStreamController.prototype);
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
          return stream;
        }
        function InitializeReadableStream(stream) {
          stream._state = "readable";
          stream._reader = void 0;
          stream._storedError = void 0;
          stream._disturbed = false;
        }
        function IsReadableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStream2;
        }
        function IsReadableStreamLocked(stream) {
          if (stream._reader === void 0) {
            return false;
          }
          return true;
        }
        function ReadableStreamCancel(stream, reason) {
          stream._disturbed = true;
          if (stream._state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (stream._state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          ReadableStreamClose(stream);
          const reader = stream._reader;
          if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._closeSteps(void 0);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
          const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
          return transformPromiseWith(sourceCancelPromise, noop3);
        }
        function ReadableStreamClose(stream) {
          stream._state = "closed";
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseResolve(reader);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
          }
        }
        function ReadableStreamError(stream, e2) {
          stream._state = "errored";
          stream._storedError = e2;
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseReject(reader, e2);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._errorSteps(e2);
            });
            reader._readRequests = new SimpleQueue();
          } else {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._errorSteps(e2);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
        }
        function streamBrandCheckException$1(name) {
          return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
        }
        function convertQueuingStrategyInit(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
          return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark)
          };
        }
        const byteLengthSizeFunction = (chunk) => {
          return chunk.byteLength;
        };
        Object.defineProperty(byteLengthSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class ByteLengthQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("highWaterMark");
            }
            return this._byteLengthQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("size");
            }
            return byteLengthSizeFunction;
          }
        }
        Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "ByteLengthQueuingStrategy",
            configurable: true
          });
        }
        function byteLengthBrandCheckException(name) {
          return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
        }
        function IsByteLengthQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof ByteLengthQueuingStrategy;
        }
        const countSizeFunction = () => {
          return 1;
        };
        Object.defineProperty(countSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class CountQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "CountQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._countQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("highWaterMark");
            }
            return this._countQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("size");
            }
            return countSizeFunction;
          }
        }
        Object.defineProperties(CountQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "CountQueuingStrategy",
            configurable: true
          });
        }
        function countBrandCheckException(name) {
          return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
        }
        function IsCountQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof CountQueuingStrategy;
        }
        function convertTransformer(original, context) {
          assertDictionary(original, context);
          const flush = original === null || original === void 0 ? void 0 : original.flush;
          const readableType = original === null || original === void 0 ? void 0 : original.readableType;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const transform = original === null || original === void 0 ? void 0 : original.transform;
          const writableType = original === null || original === void 0 ? void 0 : original.writableType;
          return {
            flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
            readableType,
            start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
            transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
            writableType
          };
        }
        function convertTransformerFlushCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertTransformerStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertTransformerTransformCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        class TransformStream {
          constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
            if (rawTransformer === void 0) {
              rawTransformer = null;
            }
            const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
            const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
            const transformer = convertTransformer(rawTransformer, "First parameter");
            if (transformer.readableType !== void 0) {
              throw new RangeError("Invalid readableType specified");
            }
            if (transformer.writableType !== void 0) {
              throw new RangeError("Invalid writableType specified");
            }
            const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
            const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
            const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
            const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
            let startPromise_resolve;
            const startPromise = newPromise((resolve2) => {
              startPromise_resolve = resolve2;
            });
            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
            if (transformer.start !== void 0) {
              startPromise_resolve(transformer.start(this._transformStreamController));
            } else {
              startPromise_resolve(void 0);
            }
          }
          get readable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("readable");
            }
            return this._readable;
          }
          get writable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("writable");
            }
            return this._writable;
          }
        }
        Object.defineProperties(TransformStream.prototype, {
          readable: { enumerable: true },
          writable: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStream",
            configurable: true
          });
        }
        function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
          function startAlgorithm() {
            return startPromise;
          }
          function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
          }
          function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
          }
          function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream);
          }
          stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
          function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream);
          }
          function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
            return promiseResolvedWith(void 0);
          }
          stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          stream._backpressure = void 0;
          stream._backpressureChangePromise = void 0;
          stream._backpressureChangePromise_resolve = void 0;
          TransformStreamSetBackpressure(stream, true);
          stream._transformStreamController = void 0;
        }
        function IsTransformStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
            return false;
          }
          return x2 instanceof TransformStream;
        }
        function TransformStreamError(stream, e2) {
          ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
        }
        function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
          TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
          WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
          if (stream._backpressure) {
            TransformStreamSetBackpressure(stream, false);
          }
        }
        function TransformStreamSetBackpressure(stream, backpressure) {
          if (stream._backpressureChangePromise !== void 0) {
            stream._backpressureChangePromise_resolve();
          }
          stream._backpressureChangePromise = newPromise((resolve2) => {
            stream._backpressureChangePromise_resolve = resolve2;
          });
          stream._backpressure = backpressure;
        }
        class TransformStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("desiredSize");
            }
            const readableController = this._controlledTransformStream._readable._readableStreamController;
            return ReadableStreamDefaultControllerGetDesiredSize(readableController);
          }
          enqueue(chunk = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("enqueue");
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
          }
          error(reason = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("error");
            }
            TransformStreamDefaultControllerError(this, reason);
          }
          terminate() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("terminate");
            }
            TransformStreamDefaultControllerTerminate(this);
          }
        }
        Object.defineProperties(TransformStreamDefaultController.prototype, {
          enqueue: { enumerable: true },
          error: { enumerable: true },
          terminate: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStreamDefaultController",
            configurable: true
          });
        }
        function IsTransformStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
            return false;
          }
          return x2 instanceof TransformStreamDefaultController;
        }
        function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
          controller._controlledTransformStream = stream;
          stream._transformStreamController = controller;
          controller._transformAlgorithm = transformAlgorithm;
          controller._flushAlgorithm = flushAlgorithm;
        }
        function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
          const controller = Object.create(TransformStreamDefaultController.prototype);
          let transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
          let flushAlgorithm = () => promiseResolvedWith(void 0);
          if (transformer.transform !== void 0) {
            transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
          }
          if (transformer.flush !== void 0) {
            flushAlgorithm = () => transformer.flush(controller);
          }
          SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
        }
        function TransformStreamDefaultControllerClearAlgorithms(controller) {
          controller._transformAlgorithm = void 0;
          controller._flushAlgorithm = void 0;
        }
        function TransformStreamDefaultControllerEnqueue(controller, chunk) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
            throw new TypeError("Readable side is not in a state that permits enqueue");
          }
          try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
          } catch (e2) {
            TransformStreamErrorWritableAndUnblockWrite(stream, e2);
            throw stream._readable._storedError;
          }
          const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
          if (backpressure !== stream._backpressure) {
            TransformStreamSetBackpressure(stream, true);
          }
        }
        function TransformStreamDefaultControllerError(controller, e2) {
          TransformStreamError(controller._controlledTransformStream, e2);
        }
        function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
          const transformPromise = controller._transformAlgorithm(chunk);
          return transformPromiseWith(transformPromise, void 0, (r2) => {
            TransformStreamError(controller._controlledTransformStream, r2);
            throw r2;
          });
        }
        function TransformStreamDefaultControllerTerminate(controller) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          ReadableStreamDefaultControllerClose(readableController);
          const error2 = new TypeError("TransformStream terminated");
          TransformStreamErrorWritableAndUnblockWrite(stream, error2);
        }
        function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
          const controller = stream._transformStreamController;
          if (stream._backpressure) {
            const backpressureChangePromise = stream._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, () => {
              const writable2 = stream._writable;
              const state = writable2._state;
              if (state === "erroring") {
                throw writable2._storedError;
              }
              return TransformStreamDefaultControllerPerformTransform(controller, chunk);
            });
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        }
        function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
          TransformStreamError(stream, reason);
          return promiseResolvedWith(void 0);
        }
        function TransformStreamDefaultSinkCloseAlgorithm(stream) {
          const readable2 = stream._readable;
          const controller = stream._transformStreamController;
          const flushPromise = controller._flushAlgorithm();
          TransformStreamDefaultControllerClearAlgorithms(controller);
          return transformPromiseWith(flushPromise, () => {
            if (readable2._state === "errored") {
              throw readable2._storedError;
            }
            ReadableStreamDefaultControllerClose(readable2._readableStreamController);
          }, (r2) => {
            TransformStreamError(stream, r2);
            throw readable2._storedError;
          });
        }
        function TransformStreamDefaultSourcePullAlgorithm(stream) {
          TransformStreamSetBackpressure(stream, false);
          return stream._backpressureChangePromise;
        }
        function defaultControllerBrandCheckException(name) {
          return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
        }
        function streamBrandCheckException(name) {
          return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
        }
        exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
        exports2.CountQueuingStrategy = CountQueuingStrategy;
        exports2.ReadableByteStreamController = ReadableByteStreamController;
        exports2.ReadableStream = ReadableStream2;
        exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
        exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
        exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
        exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
        exports2.TransformStream = TransformStream;
        exports2.TransformStreamDefaultController = TransformStreamDefaultController;
        exports2.WritableStream = WritableStream;
        exports2.WritableStreamDefaultController = WritableStreamDefaultController;
        exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    })(ponyfill_es2018, ponyfill_es2018.exports);
    POOL_SIZE$1 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error2) {
          process2.emitWarning = emitWarning;
          throw error2;
        }
      } catch (error2) {
        Object.assign(globalThis, ponyfill_es2018.exports);
      }
    }
    try {
      const { Blob: Blob2 } = require("buffer");
      if (Blob2 && !Blob2.prototype.stream) {
        Blob2.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error2) {
    }
    POOL_SIZE = 65536;
    _Blob = (_a = class {
      constructor(blobParts = [], options = {}) {
        __privateAdd(this, _parts, []);
        __privateAdd(this, _type, "");
        __privateAdd(this, _size, 0);
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null)
          options = {};
        const encoder2 = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof _a) {
            part = element;
          } else {
            part = encoder2.encode(element);
          }
          __privateSet(this, _size, __privateGet(this, _size) + (ArrayBuffer.isView(part) ? part.byteLength : part.size));
          __privateGet(this, _parts).push(part);
        }
        const type = options.type === void 0 ? "" : String(options.type);
        __privateSet(this, _type, /^[\x20-\x7E]*$/.test(type) ? type : "");
      }
      get size() {
        return __privateGet(this, _size);
      }
      get type() {
        return __privateGet(this, _type);
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(__privateGet(this, _parts), false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(__privateGet(this, _parts), false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(__privateGet(this, _parts), true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = __privateGet(this, _parts);
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new _a([], { type: String(type).toLowerCase() });
        __privateSet(blob, _size, span);
        __privateSet(blob, _parts, blobParts);
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    }, _parts = new WeakMap(), _type = new WeakMap(), _size = new WeakMap(), _a);
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob = _Blob;
    Blob$1 = Blob;
    _File = (_a2 = class extends Blob$1 {
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        __privateAdd(this, _lastModified, 0);
        __privateAdd(this, _name, "");
        if (options === null)
          options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          __privateSet(this, _lastModified, lastModified);
        }
        __privateSet(this, _name, String(fileName));
      }
      get name() {
        return __privateGet(this, _name);
      }
      get lastModified() {
        return __privateGet(this, _lastModified);
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
    }, _lastModified = new WeakMap(), _name = new WeakMap(), _a2);
    File = _File;
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f2 = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new File([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = (_a3 = class {
      constructor(...a) {
        __privateAdd(this, _d, []);
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        __privateGet(this, _d).push(f2(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        __privateSet(this, _d, __privateGet(this, _d).filter(([b]) => b !== a));
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = __privateGet(this, _d), l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        __privateGet(this, _d).forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return __privateGet(this, _d).some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f2(...a);
        __privateGet(this, _d).forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        __privateSet(this, _d, b);
      }
      *entries() {
        yield* __privateGet(this, _d);
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    }, _d = new WeakMap(), _a3);
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    INTERNALS$2 = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = Buffer.from(body.toString());
        } else if (isBlob(body))
          ;
        else if (Buffer.isBuffer(body))
          ;
        else if (import_node_util.types.isAnyArrayBuffer(body)) {
          body = Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_node_stream.default)
          ;
        else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = Buffer.from(String(body));
        }
        let stream = body;
        if (Buffer.isBuffer(body)) {
          stream = import_node_stream.default.Readable.from(body);
        } else if (isBlob(body)) {
          stream = import_node_stream.default.Readable.from(body.stream());
        }
        this[INTERNALS$2] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_node_stream.default) {
          body.on("error", (error_) => {
            const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS$2].error = error2;
          });
        }
      }
      get body() {
        return this[INTERNALS$2].stream;
      }
      get bodyUsed() {
        return this[INTERNALS$2].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData2(this.body, ct);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
        const buf = await this.buffer();
        return new Blob$1([buf], {
          type: ct
        });
      }
      async json() {
        const buffer = await consumeBody(this);
        return JSON.parse(buffer.toString());
      }
      async text() {
        const buffer = await consumeBody(this);
        return buffer.toString();
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = (0, import_node_util.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS$2];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_node_stream.default && typeof body.getBoundary !== "function") {
        p1 = new import_node_stream.PassThrough({ highWaterMark });
        p2 = new import_node_stream.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS$2].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = (0, import_node_util.deprecate)((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (Buffer.isBuffer(body) || import_node_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof import_node_stream.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS$2];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        body.pipe(dest);
      }
    };
    validateHeaderName = typeof import_node_http.default.validateHeaderName === "function" ? import_node_http.default.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error2;
      }
    };
    validateHeaderValue = typeof import_node_http.default.validateHeaderValue === "function" ? import_node_http.default.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
        throw error2;
      }
    };
    Headers2 = class extends URLSearchParams {
      constructor(init2) {
        let result = [];
        if (init2 instanceof Headers2) {
          const raw = init2.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init2 == null)
          ;
        else if (typeof init2 === "object" && !import_node_util.types.isBoxedPrimitive(init2)) {
          const method = init2[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init2));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init2].map((pair) => {
              if (typeof pair !== "object" || import_node_util.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key2) => {
          result[key2] = this.getAll(key2);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key2) => {
          const values = this.getAll(key2);
          if (key2 === "host") {
            result[key2] = values[0];
          } else {
            result[key2] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers2.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
    redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
    INTERNALS$1 = Symbol("Response internals");
    Response2 = class extends Body {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers2(options.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS$1].type;
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      get highWaterMark() {
        return this[INTERNALS$1].highWaterMark;
      }
      clone() {
        return new Response2(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response2(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new Response2(null, { status: 0, statusText: "" });
        response[INTERNALS$1].type = "error";
        return response;
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response2.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
    };
    ReferrerPolicy = /* @__PURE__ */ new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
    INTERNALS = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS] === "object";
    };
    Request2 = class extends Body {
      constructor(input, init2 = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentails.`);
        }
        let method = init2.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init2.size || input.size || 0
        });
        const headers = new Headers2(init2.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init2) {
          signal = init2.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init2.referrer == null ? input.referrer : init2.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS] = {
          method,
          redirect: init2.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
        this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
        this.counter = init2.counter || input.counter || 0;
        this.agent = init2.agent || input.agent;
        this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init2.referrerPolicy || input.referrerPolicy || "";
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return (0, import_node_url.format)(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      get referrer() {
        if (this[INTERNALS].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS].referrer) {
          return this[INTERNALS].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      clone() {
        return new Request2(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request2.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS];
      const headers = new Headers2(request[INTERNALS].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS].referrer = "no-referrer";
      }
      if (request[INTERNALS].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate,br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const options = {
        path: parsedURL.pathname + search,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        parsedURL,
        options
      };
    };
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
    supportedSchemas = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
  }
});

// .svelte-kit/output/server/chunks/index-e21f07a7.js
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
}
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css3) => css3.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
var current_component, escaped, missing_component, on_destroy;
var init_index_e21f07a7 = __esm({
  ".svelte-kit/output/server/chunks/index-e21f07a7.js"() {
    Promise.resolve();
    escaped = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/hooks-4c32a140.js
var hooks_4c32a140_exports = {};
__export(hooks_4c32a140_exports, {
  handle: () => handle
});
async function handle({ event, resolve: resolve2 }) {
  const response = await resolve2(event, {
    ssr: false
  });
  return response;
}
var init_hooks_4c32a140 = __esm({
  ".svelte-kit/output/server/chunks/hooks-4c32a140.js"() {
  }
});

// .svelte-kit/output/server/entries/pages/__layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => _layout
});
var Navbar, _layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/__layout.svelte.js"() {
    init_index_e21f07a7();
    Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<nav class="${"navbar is-brewipedia-color"}" aria-label="${"main navigation"}"><div class="${"navbar-brand"}"><a class="${"navbar-item"}" href="${"/"}"><img class="${"is-inline mr-2"}" src="${"favicon-32x32.png"}" alt="${"brewipedia icon"}">
      <p class="${"is-family-secondary is-size-2"}">Brewipedia</p></a></div></nav>`;
    });
    _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}

${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  css: () => css,
  entry: () => entry,
  js: () => js,
  module: () => layout_svelte_exports
});
var entry, js, css;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_svelte();
    entry = "pages/__layout.svelte-19482daa.js";
    js = ["pages/__layout.svelte-19482daa.js", "chunks/vendor-9d59ef25.js"];
    css = ["assets/pages/__layout.svelte-1e227f54.css"];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2,
  load: () => load
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_index_e21f07a7();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { status } = $$props;
      let { error: error2 } = $$props;
      if ($$props.status === void 0 && $$bindings.status && status !== void 0)
        $$bindings.status(status);
      if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
        $$bindings.error(error2);
      return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  css: () => css2,
  entry: () => entry2,
  js: () => js2,
  module: () => error_svelte_exports
});
var entry2, js2, css2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    init_error_svelte();
    entry2 = "error.svelte-7d183e69.js";
    js2 = ["error.svelte-7d183e69.js", "chunks/vendor-9d59ef25.js"];
    css2 = [];
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/APPEND.js
var require_APPEND = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/APPEND.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, value) {
      return ["APPEND", key2, value];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BITCOUNT.js
var require_BITCOUNT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BITCOUNT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, range) {
      const args = ["BITCOUNT", key2];
      if (range) {
        args.push(range.start.toString(), range.end.toString());
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BITFIELD.js
var require_BITFIELD = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BITFIELD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, operations) {
      const args = ["BITFIELD", key2];
      for (const options of operations) {
        switch (options.operation) {
          case "GET":
            args.push("GET", options.type, options.offset.toString());
            break;
          case "SET":
            args.push("SET", options.type, options.offset.toString(), options.value.toString());
            break;
          case "INCRBY":
            args.push("INCRBY", options.type, options.offset.toString(), options.increment.toString());
            break;
          case "OVERFLOW":
            args.push("OVERFLOW", options.behavior);
            break;
        }
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/generic-transformers.js
var require_generic_transformers = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/generic-transformers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformCommandReply = exports.CommandCategories = exports.CommandFlags = exports.pushOptionalVerdictArgument = exports.pushVerdictArgument = exports.pushVerdictArguments = exports.pushEvalArguments = exports.transformPXAT = exports.transformEXAT = exports.transformGeoMembersWithReply = exports.GeoReplyWith = exports.pushGeoSearchArguments = exports.pushGeoCountArgument = exports.transformSortedSetWithScoresReply = exports.transformSortedSetMemberNullReply = exports.transformStreamsMessagesReply = exports.transformStreamMessagesReply = exports.transformTuplesReply = exports.transformStringNumberInfinityArgument = exports.transformNumberInfinityArgument = exports.transformNumberInfinityNullArrayReply = exports.transformNumberInfinityNullReply = exports.transformNumberInfinityReply = exports.pushScanArguments = exports.transformBooleanArrayReply = exports.transformBooleanReply = void 0;
    function transformBooleanReply(reply) {
      return reply === 1;
    }
    exports.transformBooleanReply = transformBooleanReply;
    function transformBooleanArrayReply(reply) {
      return reply.map(transformBooleanReply);
    }
    exports.transformBooleanArrayReply = transformBooleanArrayReply;
    function pushScanArguments(args, cursor, options) {
      args.push(cursor.toString());
      if (options === null || options === void 0 ? void 0 : options.MATCH) {
        args.push("MATCH", options.MATCH);
      }
      if (options === null || options === void 0 ? void 0 : options.COUNT) {
        args.push("COUNT", options.COUNT.toString());
      }
      return args;
    }
    exports.pushScanArguments = pushScanArguments;
    function transformNumberInfinityReply(reply) {
      switch (reply.toString()) {
        case "+inf":
          return Infinity;
        case "-inf":
          return -Infinity;
        default:
          return Number(reply);
      }
    }
    exports.transformNumberInfinityReply = transformNumberInfinityReply;
    function transformNumberInfinityNullReply(reply) {
      if (reply === null)
        return null;
      return transformNumberInfinityReply(reply);
    }
    exports.transformNumberInfinityNullReply = transformNumberInfinityNullReply;
    function transformNumberInfinityNullArrayReply(reply) {
      return reply.map(transformNumberInfinityNullReply);
    }
    exports.transformNumberInfinityNullArrayReply = transformNumberInfinityNullArrayReply;
    function transformNumberInfinityArgument(num) {
      switch (num) {
        case Infinity:
          return "+inf";
        case -Infinity:
          return "-inf";
        default:
          return num.toString();
      }
    }
    exports.transformNumberInfinityArgument = transformNumberInfinityArgument;
    function transformStringNumberInfinityArgument(num) {
      if (typeof num !== "number")
        return num;
      return transformNumberInfinityArgument(num);
    }
    exports.transformStringNumberInfinityArgument = transformStringNumberInfinityArgument;
    function transformTuplesReply(reply) {
      const message = /* @__PURE__ */ Object.create(null);
      for (let i2 = 0; i2 < reply.length; i2 += 2) {
        message[reply[i2].toString()] = reply[i2 + 1];
      }
      return message;
    }
    exports.transformTuplesReply = transformTuplesReply;
    function transformStreamMessagesReply(reply) {
      const messages = [];
      for (const [id, message] of reply) {
        messages.push({
          id,
          message: transformTuplesReply(message)
        });
      }
      return messages;
    }
    exports.transformStreamMessagesReply = transformStreamMessagesReply;
    function transformStreamsMessagesReply(reply) {
      if (reply === null)
        return null;
      return reply.map(([name, rawMessages]) => ({
        name,
        messages: transformStreamMessagesReply(rawMessages)
      }));
    }
    exports.transformStreamsMessagesReply = transformStreamsMessagesReply;
    function transformSortedSetMemberNullReply(reply) {
      if (!reply.length)
        return null;
      return {
        value: reply[0],
        score: transformNumberInfinityReply(reply[1])
      };
    }
    exports.transformSortedSetMemberNullReply = transformSortedSetMemberNullReply;
    function transformSortedSetWithScoresReply(reply) {
      const members = [];
      for (let i2 = 0; i2 < reply.length; i2 += 2) {
        members.push({
          value: reply[i2],
          score: transformNumberInfinityReply(reply[i2 + 1])
        });
      }
      return members;
    }
    exports.transformSortedSetWithScoresReply = transformSortedSetWithScoresReply;
    function pushGeoCountArgument(args, count) {
      if (typeof count === "number") {
        args.push("COUNT", count.toString());
      } else if (count) {
        args.push("COUNT", count.value.toString());
        if (count.ANY) {
          args.push("ANY");
        }
      }
      return args;
    }
    exports.pushGeoCountArgument = pushGeoCountArgument;
    function pushGeoSearchArguments(args, key2, from, by, options) {
      args.push(key2);
      if (typeof from === "string") {
        args.push("FROMMEMBER", from);
      } else {
        args.push("FROMLONLAT", from.longitude.toString(), from.latitude.toString());
      }
      if ("radius" in by) {
        args.push("BYRADIUS", by.radius.toString());
      } else {
        args.push("BYBOX", by.width.toString(), by.height.toString());
      }
      args.push(by.unit);
      if (options === null || options === void 0 ? void 0 : options.SORT) {
        args.push(options.SORT);
      }
      pushGeoCountArgument(args, options === null || options === void 0 ? void 0 : options.COUNT);
      return args;
    }
    exports.pushGeoSearchArguments = pushGeoSearchArguments;
    var GeoReplyWith;
    (function(GeoReplyWith2) {
      GeoReplyWith2["DISTANCE"] = "WITHDIST";
      GeoReplyWith2["HASH"] = "WITHHASH";
      GeoReplyWith2["COORDINATES"] = "WITHCOORD";
    })(GeoReplyWith = exports.GeoReplyWith || (exports.GeoReplyWith = {}));
    function transformGeoMembersWithReply(reply, replyWith) {
      const replyWithSet = new Set(replyWith);
      let index = 0;
      const distanceIndex = replyWithSet.has(GeoReplyWith.DISTANCE) && ++index, hashIndex = replyWithSet.has(GeoReplyWith.HASH) && ++index, coordinatesIndex = replyWithSet.has(GeoReplyWith.COORDINATES) && ++index;
      return reply.map((member) => {
        const transformedMember = {
          member: member[0]
        };
        if (distanceIndex) {
          transformedMember.distance = member[distanceIndex];
        }
        if (hashIndex) {
          transformedMember.hash = member[hashIndex];
        }
        if (coordinatesIndex) {
          const [longitude, latitude] = member[coordinatesIndex];
          transformedMember.coordinates = {
            longitude,
            latitude
          };
        }
        return transformedMember;
      });
    }
    exports.transformGeoMembersWithReply = transformGeoMembersWithReply;
    function transformEXAT(EXAT) {
      return (typeof EXAT === "number" ? EXAT : Math.floor(EXAT.getTime() / 1e3)).toString();
    }
    exports.transformEXAT = transformEXAT;
    function transformPXAT(PXAT) {
      return (typeof PXAT === "number" ? PXAT : PXAT.getTime()).toString();
    }
    exports.transformPXAT = transformPXAT;
    function pushEvalArguments(args, options) {
      if (options === null || options === void 0 ? void 0 : options.keys) {
        args.push(options.keys.length.toString(), ...options.keys);
      } else {
        args.push("0");
      }
      if (options === null || options === void 0 ? void 0 : options.arguments) {
        args.push(...options.arguments);
      }
      return args;
    }
    exports.pushEvalArguments = pushEvalArguments;
    function pushVerdictArguments(args, value) {
      if (Array.isArray(value)) {
        args.push(...value);
      } else {
        args.push(value);
      }
      return args;
    }
    exports.pushVerdictArguments = pushVerdictArguments;
    function pushVerdictArgument(args, value) {
      if (Array.isArray(value)) {
        args.push(value.length.toString(), ...value);
      } else {
        args.push("1", value);
      }
      return args;
    }
    exports.pushVerdictArgument = pushVerdictArgument;
    function pushOptionalVerdictArgument(args, name, value) {
      if (value === void 0)
        return args;
      args.push(name);
      return pushVerdictArgument(args, value);
    }
    exports.pushOptionalVerdictArgument = pushOptionalVerdictArgument;
    var CommandFlags;
    (function(CommandFlags2) {
      CommandFlags2["WRITE"] = "write";
      CommandFlags2["READONLY"] = "readonly";
      CommandFlags2["DENYOOM"] = "denyoom";
      CommandFlags2["ADMIN"] = "admin";
      CommandFlags2["PUBSUB"] = "pubsub";
      CommandFlags2["NOSCRIPT"] = "noscript";
      CommandFlags2["RANDOM"] = "random";
      CommandFlags2["SORT_FOR_SCRIPT"] = "sort_for_script";
      CommandFlags2["LOADING"] = "loading";
      CommandFlags2["STALE"] = "stale";
      CommandFlags2["SKIP_MONITOR"] = "skip_monitor";
      CommandFlags2["ASKING"] = "asking";
      CommandFlags2["FAST"] = "fast";
      CommandFlags2["MOVABLEKEYS"] = "movablekeys";
    })(CommandFlags = exports.CommandFlags || (exports.CommandFlags = {}));
    var CommandCategories;
    (function(CommandCategories2) {
      CommandCategories2["KEYSPACE"] = "@keyspace";
      CommandCategories2["READ"] = "@read";
      CommandCategories2["WRITE"] = "@write";
      CommandCategories2["SET"] = "@set";
      CommandCategories2["SORTEDSET"] = "@sortedset";
      CommandCategories2["LIST"] = "@list";
      CommandCategories2["HASH"] = "@hash";
      CommandCategories2["STRING"] = "@string";
      CommandCategories2["BITMAP"] = "@bitmap";
      CommandCategories2["HYPERLOGLOG"] = "@hyperloglog";
      CommandCategories2["GEO"] = "@geo";
      CommandCategories2["STREAM"] = "@stream";
      CommandCategories2["PUBSUB"] = "@pubsub";
      CommandCategories2["ADMIN"] = "@admin";
      CommandCategories2["FAST"] = "@fast";
      CommandCategories2["SLOW"] = "@slow";
      CommandCategories2["BLOCKING"] = "@blocking";
      CommandCategories2["DANGEROUS"] = "@dangerous";
      CommandCategories2["CONNECTION"] = "@connection";
      CommandCategories2["TRANSACTION"] = "@transaction";
      CommandCategories2["SCRIPTING"] = "@scripting";
    })(CommandCategories = exports.CommandCategories || (exports.CommandCategories = {}));
    function transformCommandReply([name, arity, flags, firstKeyIndex, lastKeyIndex, step, categories]) {
      return {
        name,
        arity,
        flags: new Set(flags),
        firstKeyIndex,
        lastKeyIndex,
        step,
        categories: new Set(categories)
      };
    }
    exports.transformCommandReply = transformCommandReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BITOP.js
var require_BITOP = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BITOP.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 2;
    function transformArguments(operation, destKey, key2) {
      return (0, generic_transformers_1.pushVerdictArguments)(["BITOP", operation, destKey], key2);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BITPOS.js
var require_BITPOS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BITPOS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, bit, start, end) {
      const args = ["BITPOS", key2, bit.toString()];
      if (typeof start === "number") {
        args.push(start.toString());
      }
      if (typeof end === "number") {
        args.push(end.toString());
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BLMOVE.js
var require_BLMOVE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BLMOVE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(source, destination, sourceDirection, destinationDirection, timeout) {
      return [
        "BLMOVE",
        source,
        destination,
        sourceDirection,
        destinationDirection,
        timeout.toString()
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BLPOP.js
var require_BLPOP = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BLPOP.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(keys, timeout) {
      const args = (0, generic_transformers_1.pushVerdictArguments)(["BLPOP"], keys);
      args.push(timeout.toString());
      return args;
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      if (reply === null)
        return null;
      return {
        key: reply[0],
        element: reply[1]
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BRPOP.js
var require_BRPOP = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BRPOP.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, timeout) {
      const args = (0, generic_transformers_1.pushVerdictArguments)(["BRPOP"], key2);
      args.push(timeout.toString());
      return args;
    }
    exports.transformArguments = transformArguments;
    var BLPOP_1 = require_BLPOP();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return BLPOP_1.transformReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BRPOPLPUSH.js
var require_BRPOPLPUSH = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BRPOPLPUSH.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(source, destination, timeout) {
      return ["BRPOPLPUSH", source, destination, timeout.toString()];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BZPOPMAX.js
var require_BZPOPMAX = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BZPOPMAX.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, timeout) {
      const args = (0, generic_transformers_1.pushVerdictArguments)(["BZPOPMAX"], key2);
      args.push(timeout.toString());
      return args;
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      if (!reply)
        return null;
      return {
        key: reply[0],
        value: reply[1],
        score: (0, generic_transformers_1.transformNumberInfinityReply)(reply[2])
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BZPOPMIN.js
var require_BZPOPMIN = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BZPOPMIN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, timeout) {
      const args = (0, generic_transformers_1.pushVerdictArguments)(["BZPOPMIN"], key2);
      args.push(timeout.toString());
      return args;
    }
    exports.transformArguments = transformArguments;
    var BZPOPMAX_1 = require_BZPOPMAX();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return BZPOPMAX_1.transformReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/COPY.js
var require_COPY = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/COPY.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(source, destination, options) {
      const args = ["COPY", source, destination];
      if (options === null || options === void 0 ? void 0 : options.destinationDb) {
        args.push("DB", options.destinationDb.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.replace) {
        args.push("REPLACE");
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/DECR.js
var require_DECR = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/DECR.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2) {
      return ["DECR", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/DECRBY.js
var require_DECRBY = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/DECRBY.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, decrement) {
      return ["DECRBY", key2, decrement.toString()];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/DEL.js
var require_DEL = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/DEL.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    var generic_transformers_1 = require_generic_transformers();
    function transformArguments(keys) {
      return (0, generic_transformers_1.pushVerdictArguments)(["DEL"], keys);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/DUMP.js
var require_DUMP = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/DUMP.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(key2) {
      return ["DUMP", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/EVAL.js
var require_EVAL = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/EVAL.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    var generic_transformers_1 = require_generic_transformers();
    function transformArguments(script, options) {
      return (0, generic_transformers_1.pushEvalArguments)(["EVAL", script], options);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/EVALSHA.js
var require_EVALSHA = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/EVALSHA.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    var generic_transformers_1 = require_generic_transformers();
    function transformArguments(sha1, options) {
      return (0, generic_transformers_1.pushEvalArguments)(["EVALSHA", sha1], options);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/EXISTS.js
var require_EXISTS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/EXISTS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(keys) {
      return (0, generic_transformers_1.pushVerdictArguments)(["EXISTS"], keys);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/EXPIRE.js
var require_EXPIRE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/EXPIRE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, seconds) {
      return ["EXPIRE", key2, seconds.toString()];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/EXPIREAT.js
var require_EXPIREAT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/EXPIREAT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, timestamp) {
      return [
        "EXPIREAT",
        key2,
        (0, generic_transformers_1.transformEXAT)(timestamp)
      ];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_2 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_2.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GEOADD.js
var require_GEOADD = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GEOADD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, toAdd, options) {
      var _a4, _b;
      const args = ["GEOADD", key2];
      if ((_a4 = options) === null || _a4 === void 0 ? void 0 : _a4.NX) {
        args.push("NX");
      } else if ((_b = options) === null || _b === void 0 ? void 0 : _b.XX) {
        args.push("XX");
      }
      if (options === null || options === void 0 ? void 0 : options.CH) {
        args.push("CH");
      }
      for (const { longitude, latitude, member } of Array.isArray(toAdd) ? toAdd : [toAdd]) {
        args.push(longitude.toString(), latitude.toString(), member);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GEODIST.js
var require_GEODIST = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GEODIST.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, member1, member2, unit) {
      const args = ["GEODIST", key2, member1, member2];
      if (unit) {
        args.push(unit);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return reply === null ? null : Number(reply);
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GEOHASH.js
var require_GEOHASH = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GEOHASH.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, member) {
      return (0, generic_transformers_1.pushVerdictArguments)(["GEOHASH", key2], member);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GEOPOS.js
var require_GEOPOS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GEOPOS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, member) {
      return (0, generic_transformers_1.pushVerdictArguments)(["GEOPOS", key2], member);
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return reply.map((coordinates) => coordinates === null ? null : {
        longitude: coordinates[0],
        latitude: coordinates[1]
      });
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GEOSEARCH.js
var require_GEOSEARCH = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GEOSEARCH.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, from, by, options) {
      return (0, generic_transformers_1.pushGeoSearchArguments)(["GEOSEARCH"], key2, from, by, options);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GEOSEARCH_WITH.js
var require_GEOSEARCH_WITH = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GEOSEARCH_WITH.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var GEOSEARCH_1 = require_GEOSEARCH();
    var GEOSEARCH_2 = require_GEOSEARCH();
    Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
      return GEOSEARCH_2.FIRST_KEY_INDEX;
    } });
    Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
      return GEOSEARCH_2.IS_READ_ONLY;
    } });
    function transformArguments(key2, from, by, replyWith, options) {
      const args = (0, GEOSEARCH_1.transformArguments)(key2, from, by, options);
      args.push(...replyWith);
      args.preserve = replyWith;
      return args;
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformGeoMembersWithReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GEOSEARCHSTORE.js
var require_GEOSEARCHSTORE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GEOSEARCHSTORE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(destination, source, from, by, options) {
      const args = (0, generic_transformers_1.pushGeoSearchArguments)(["GEOSEARCHSTORE", destination], source, from, by, options);
      if (options === null || options === void 0 ? void 0 : options.STOREDIST) {
        args.push("STOREDIST");
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      if (typeof reply !== "number") {
        throw new TypeError(`https://github.com/redis/redis/issues/9261`);
      }
      return reply;
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GET.js
var require_GET = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2) {
      return ["GET", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GETBIT.js
var require_GETBIT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GETBIT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, offset) {
      return ["GETBIT", key2, offset.toString()];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GETDEL.js
var require_GETDEL = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GETDEL.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2) {
      return ["GETDEL", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GETEX.js
var require_GETEX = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GETEX.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, mode) {
      const args = ["GETEX", key2];
      if ("EX" in mode) {
        args.push("EX", mode.EX.toString());
      } else if ("PX" in mode) {
        args.push("PX", mode.PX.toString());
      } else if ("EXAT" in mode) {
        args.push("EXAT", (0, generic_transformers_1.transformEXAT)(mode.EXAT));
      } else if ("PXAT" in mode) {
        args.push("PXAT", (0, generic_transformers_1.transformPXAT)(mode.PXAT));
      } else {
        args.push("PERSIST");
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GETRANGE.js
var require_GETRANGE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GETRANGE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, start, end) {
      return ["GETRANGE", key2, start.toString(), end.toString()];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GETSET.js
var require_GETSET = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/GETSET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, value) {
      return ["GETSET", key2, value];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HDEL.js
var require_HDEL = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HDEL.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, field) {
      return (0, generic_transformers_1.pushVerdictArguments)(["HDEL", key2], field);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HEXISTS.js
var require_HEXISTS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HEXISTS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, field) {
      return ["HEXISTS", key2, field];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HGET.js
var require_HGET = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HGET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, field) {
      return ["HGET", key2, field];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HGETALL.js
var require_HGETALL = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HGETALL.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2) {
      return ["HGETALL", key2];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformTuplesReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HINCRBY.js
var require_HINCRBY = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HINCRBY.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, field, increment) {
      return ["HINCRBY", key2, field, increment.toString()];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HINCRBYFLOAT.js
var require_HINCRBYFLOAT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HINCRBYFLOAT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, field, increment) {
      return ["HINCRBYFLOAT", key2, field, increment.toString()];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HKEYS.js
var require_HKEYS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HKEYS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2) {
      return ["HKEYS", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HLEN.js
var require_HLEN = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HLEN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2) {
      return ["HLEN", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HMGET.js
var require_HMGET = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HMGET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, fields) {
      return (0, generic_transformers_1.pushVerdictArguments)(["HMGET", key2], fields);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HRANDFIELD.js
var require_HRANDFIELD = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HRANDFIELD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2) {
      return ["HRANDFIELD", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HRANDFIELD_COUNT.js
var require_HRANDFIELD_COUNT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HRANDFIELD_COUNT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var HRANDFIELD_1 = require_HRANDFIELD();
    var HRANDFIELD_2 = require_HRANDFIELD();
    Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
      return HRANDFIELD_2.FIRST_KEY_INDEX;
    } });
    Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
      return HRANDFIELD_2.IS_READ_ONLY;
    } });
    function transformArguments(key2, count) {
      return [
        ...(0, HRANDFIELD_1.transformArguments)(key2),
        count.toString()
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HRANDFIELD_COUNT_WITHVALUES.js
var require_HRANDFIELD_COUNT_WITHVALUES = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HRANDFIELD_COUNT_WITHVALUES.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var HRANDFIELD_COUNT_1 = require_HRANDFIELD_COUNT();
    var HRANDFIELD_COUNT_2 = require_HRANDFIELD_COUNT();
    Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
      return HRANDFIELD_COUNT_2.FIRST_KEY_INDEX;
    } });
    Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
      return HRANDFIELD_COUNT_2.IS_READ_ONLY;
    } });
    function transformArguments(key2, count) {
      return [
        ...(0, HRANDFIELD_COUNT_1.transformArguments)(key2, count),
        "WITHVALUES"
      ];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformTuplesReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HSCAN.js
var require_HSCAN = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HSCAN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, cursor, options) {
      return (0, generic_transformers_1.pushScanArguments)([
        "HSCAN",
        key2
      ], cursor, options);
    }
    exports.transformArguments = transformArguments;
    function transformReply([cursor, rawTuples]) {
      const parsedTuples = [];
      for (let i2 = 0; i2 < rawTuples.length; i2 += 2) {
        parsedTuples.push({
          field: rawTuples[i2],
          value: rawTuples[i2 + 1]
        });
      }
      return {
        cursor: Number(cursor),
        tuples: parsedTuples
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HSET.js
var require_HSET = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HSET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(...[key2, value, fieldValue]) {
      const args = ["HSET", key2];
      if (typeof value === "string" || typeof value === "number" || Buffer.isBuffer(value)) {
        pushValue(args, value);
        pushValue(args, fieldValue);
      } else if (value instanceof Map) {
        pushMap(args, value);
      } else if (Array.isArray(value)) {
        pushTuples(args, value);
      } else {
        pushObject(args, value);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    function pushMap(args, map) {
      for (const [key2, value] of map.entries()) {
        pushValue(args, key2);
        pushValue(args, value);
      }
    }
    function pushTuples(args, tuples) {
      for (const tuple of tuples) {
        if (Array.isArray(tuple)) {
          pushTuples(args, tuple);
          continue;
        }
        pushValue(args, tuple);
      }
    }
    function pushObject(args, object) {
      for (const key2 of Object.keys(object)) {
        args.push(key2.toString(), object[key2].toString());
      }
    }
    function pushValue(args, value) {
      args.push(typeof value === "number" ? value.toString() : value);
    }
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HSETNX.js
var require_HSETNX = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HSETNX.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, field, value) {
      return ["HSETNX", key2, field, value];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HSTRLEN.js
var require_HSTRLEN = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HSTRLEN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, field) {
      return ["HSTRLEN", key2, field];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HVALS.js
var require_HVALS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HVALS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2) {
      return ["HVALS", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/INCR.js
var require_INCR = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/INCR.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2) {
      return ["INCR", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/INCRBY.js
var require_INCRBY = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/INCRBY.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, increment) {
      return ["INCRBY", key2, increment.toString()];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/INCRBYFLOAT.js
var require_INCRBYFLOAT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/INCRBYFLOAT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, increment) {
      return ["INCRBYFLOAT", key2, increment.toString()];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LINDEX.js
var require_LINDEX = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LINDEX.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = void 0;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, index) {
      return ["LINDEX", key2, index.toString()];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LINSERT.js
var require_LINSERT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LINSERT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, position, pivot, element) {
      return [
        "LINSERT",
        key2,
        position,
        pivot,
        element
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LLEN.js
var require_LLEN = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LLEN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2) {
      return ["LLEN", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LMOVE.js
var require_LMOVE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LMOVE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(source, destination, sourceSide, destinationSide) {
      return [
        "LMOVE",
        source,
        destination,
        sourceSide,
        destinationSide
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LPOP_COUNT.js
var require_LPOP_COUNT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LPOP_COUNT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, count) {
      return ["LPOP", key2, count.toString()];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LPOP.js
var require_LPOP = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LPOP.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2) {
      return ["LPOP", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LPOS.js
var require_LPOS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LPOS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, element, options) {
      const args = ["LPOS", key2, element];
      if (typeof (options === null || options === void 0 ? void 0 : options.RANK) === "number") {
        args.push("RANK", options.RANK.toString());
      }
      if (typeof (options === null || options === void 0 ? void 0 : options.MAXLEN) === "number") {
        args.push("MAXLEN", options.MAXLEN.toString());
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LPOS_COUNT.js
var require_LPOS_COUNT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LPOS_COUNT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var LPOS_1 = require_LPOS();
    Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
      return LPOS_1.FIRST_KEY_INDEX;
    } });
    Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
      return LPOS_1.IS_READ_ONLY;
    } });
    function transformArguments(key2, element, count, options) {
      const args = ["LPOS", key2, element];
      if (typeof (options === null || options === void 0 ? void 0 : options.RANK) === "number") {
        args.push("RANK", options.RANK.toString());
      }
      args.push("COUNT", count.toString());
      if (typeof (options === null || options === void 0 ? void 0 : options.MAXLEN) === "number") {
        args.push("MAXLEN", options.MAXLEN.toString());
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LPUSH.js
var require_LPUSH = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LPUSH.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, elements) {
      return (0, generic_transformers_1.pushVerdictArguments)(["LPUSH", key2], elements);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LPUSHX.js
var require_LPUSHX = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LPUSHX.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, element) {
      return (0, generic_transformers_1.pushVerdictArguments)(["LPUSHX", key2], element);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LRANGE.js
var require_LRANGE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LRANGE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, start, stop) {
      return [
        "LRANGE",
        key2,
        start.toString(),
        stop.toString()
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LREM.js
var require_LREM = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LREM.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, count, element) {
      return [
        "LREM",
        key2,
        count.toString(),
        element
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LSET.js
var require_LSET = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LSET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, index, element) {
      return [
        "LSET",
        key2,
        index.toString(),
        element
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LTRIM.js
var require_LTRIM = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LTRIM.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, start, stop) {
      return [
        "LTRIM",
        key2,
        start.toString(),
        stop.toString()
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MGET.js
var require_MGET = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MGET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(keys) {
      return ["MGET", ...keys];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MIGRATE.js
var require_MIGRATE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MIGRATE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(host, port, key2, destinationDb, timeout, options) {
      const args = ["MIGRATE", host, port.toString()], isKeyArray = Array.isArray(key2);
      if (isKeyArray) {
        args.push('""');
      } else {
        args.push(key2);
      }
      args.push(destinationDb.toString(), timeout.toString());
      if (options === null || options === void 0 ? void 0 : options.COPY) {
        args.push("COPY");
      }
      if (options === null || options === void 0 ? void 0 : options.REPLACE) {
        args.push("REPLACE");
      }
      if (options === null || options === void 0 ? void 0 : options.AUTH) {
        if (options.AUTH.username) {
          args.push("AUTH2", options.AUTH.username, options.AUTH.password);
        } else {
          args.push("AUTH", options.AUTH.password);
        }
      }
      if (isKeyArray) {
        args.push("KEYS", ...key2);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MSET.js
var require_MSET = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MSET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(toSet) {
      const args = ["MSET"];
      if (Array.isArray(toSet)) {
        args.push(...toSet.flat());
      } else {
        for (const key2 of Object.keys(toSet)) {
          args.push(key2, toSet[key2]);
        }
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MSETNX.js
var require_MSETNX = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MSETNX.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(toSet) {
      const args = ["MSETNX"];
      if (Array.isArray(toSet)) {
        args.push(...toSet.flat());
      } else {
        for (const key2 of Object.keys(toSet)) {
          args.push(key2, toSet[key2]);
        }
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PERSIST.js
var require_PERSIST = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PERSIST.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2) {
      return ["PERSIST", key2];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PEXPIRE.js
var require_PEXPIRE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PEXPIRE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, milliseconds) {
      return ["PEXPIRE", key2, milliseconds.toString()];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PEXPIREAT.js
var require_PEXPIREAT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PEXPIREAT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, millisecondsTimestamp) {
      return [
        "PEXPIREAT",
        key2,
        (0, generic_transformers_1.transformPXAT)(millisecondsTimestamp)
      ];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_2 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_2.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PFADD.js
var require_PFADD = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PFADD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, element) {
      return (0, generic_transformers_1.pushVerdictArguments)(["PFADD", key2], element);
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_2 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_2.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PFCOUNT.js
var require_PFCOUNT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PFCOUNT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2) {
      return (0, generic_transformers_1.pushVerdictArguments)(["PFCOUNT"], key2);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PFMERGE.js
var require_PFMERGE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PFMERGE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(destination, source) {
      return (0, generic_transformers_1.pushVerdictArguments)(["PFMERGE", destination], source);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PSETEX.js
var require_PSETEX = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PSETEX.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, milliseconds, value) {
      return [
        "PSETEX",
        key2,
        milliseconds.toString(),
        value
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PTTL.js
var require_PTTL = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PTTL.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2) {
      return ["PTTL", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PUBLISH.js
var require_PUBLISH = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PUBLISH.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(channel, message) {
      return ["PUBLISH", channel, message];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/RENAME.js
var require_RENAME = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/RENAME.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, newKey) {
      return ["RENAME", key2, newKey];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/RENAMENX.js
var require_RENAMENX = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/RENAMENX.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, newKey) {
      return ["RENAMENX", key2, newKey];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/RPOP_COUNT.js
var require_RPOP_COUNT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/RPOP_COUNT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, count) {
      return ["RPOP", key2, count.toString()];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/RPOP.js
var require_RPOP = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/RPOP.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2) {
      return ["RPOP", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/RPOPLPUSH.js
var require_RPOPLPUSH = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/RPOPLPUSH.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(source, destination) {
      return ["RPOPLPUSH", source, destination];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/RPUSH.js
var require_RPUSH = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/RPUSH.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, element) {
      return (0, generic_transformers_1.pushVerdictArguments)(["RPUSH", key2], element);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/RPUSHX.js
var require_RPUSHX = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/RPUSHX.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, element) {
      return (0, generic_transformers_1.pushVerdictArguments)(["RPUSHX", key2], element);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SADD.js
var require_SADD = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SADD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, members) {
      return (0, generic_transformers_1.pushVerdictArguments)(["SADD", key2], members);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SCARD.js
var require_SCARD = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SCARD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2) {
      return ["SCARD", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SDIFF.js
var require_SDIFF = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SDIFF.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(keys) {
      return (0, generic_transformers_1.pushVerdictArguments)(["SDIFF"], keys);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SDIFFSTORE.js
var require_SDIFFSTORE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SDIFFSTORE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(destination, keys) {
      return (0, generic_transformers_1.pushVerdictArguments)(["SDIFFSTORE", destination], keys);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SET.js
var require_SET = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, value, options) {
      const args = [
        "SET",
        key2,
        typeof value === "number" ? value.toString() : value
      ];
      if (options === null || options === void 0 ? void 0 : options.EX) {
        args.push("EX", options.EX.toString());
      } else if (options === null || options === void 0 ? void 0 : options.PX) {
        args.push("PX", options.PX.toString());
      } else if (options === null || options === void 0 ? void 0 : options.EXAT) {
        args.push("EXAT", options.EXAT.toString());
      } else if (options === null || options === void 0 ? void 0 : options.PXAT) {
        args.push("PXAT", options.PXAT.toString());
      } else if (options === null || options === void 0 ? void 0 : options.KEEPTTL) {
        args.push("KEEPTTL");
      }
      if (options === null || options === void 0 ? void 0 : options.NX) {
        args.push("NX");
      } else if (options === null || options === void 0 ? void 0 : options.XX) {
        args.push("XX");
      }
      if (options === null || options === void 0 ? void 0 : options.GET) {
        args.push("GET");
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SETBIT.js
var require_SETBIT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SETBIT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, offset, value) {
      return ["SETBIT", key2, offset.toString(), value.toString()];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SETEX.js
var require_SETEX = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SETEX.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, seconds, value) {
      return [
        "SETEX",
        key2,
        seconds.toString(),
        value
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SETNX.js
var require_SETNX = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SETNX.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, value) {
      return ["SETNX", key2, value];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SETRANGE.js
var require_SETRANGE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SETRANGE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, offset, value) {
      return ["SETRANGE", key2, offset.toString(), value];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SINTER.js
var require_SINTER = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SINTER.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(keys) {
      return (0, generic_transformers_1.pushVerdictArguments)(["SINTER"], keys);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SINTERSTORE.js
var require_SINTERSTORE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SINTERSTORE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(destination, keys) {
      return (0, generic_transformers_1.pushVerdictArguments)(["SINTERSTORE", destination], keys);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SISMEMBER.js
var require_SISMEMBER = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SISMEMBER.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, member) {
      return ["SISMEMBER", key2, member];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SMEMBERS.js
var require_SMEMBERS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SMEMBERS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2) {
      return ["SMEMBERS", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SMISMEMBER.js
var require_SMISMEMBER = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SMISMEMBER.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, members) {
      return ["SMISMEMBER", key2, ...members];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanArrayReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SMOVE.js
var require_SMOVE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SMOVE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(source, destination, member) {
      return ["SMOVE", source, destination, member];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SORT.js
var require_SORT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SORT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, options) {
      const args = ["SORT", key2];
      if (options === null || options === void 0 ? void 0 : options.BY) {
        args.push("BY", options.BY);
      }
      if (options === null || options === void 0 ? void 0 : options.LIMIT) {
        args.push("LIMIT", options.LIMIT.offset.toString(), options.LIMIT.count.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.GET) {
        for (const pattern of typeof options.GET === "string" ? [options.GET] : options.GET) {
          args.push("GET", pattern);
        }
      }
      if (options === null || options === void 0 ? void 0 : options.DIRECTION) {
        args.push(options.DIRECTION);
      }
      if (options === null || options === void 0 ? void 0 : options.ALPHA) {
        args.push("ALPHA");
      }
      if (options === null || options === void 0 ? void 0 : options.STORE) {
        args.push("STORE", options.STORE);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return reply;
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SPOP.js
var require_SPOP = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SPOP.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, count) {
      const args = ["SPOP", key2];
      if (typeof count === "number") {
        args.push(count.toString());
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SRANDMEMBER.js
var require_SRANDMEMBER = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SRANDMEMBER.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2) {
      return ["SRANDMEMBER", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SRANDMEMBER_COUNT.js
var require_SRANDMEMBER_COUNT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SRANDMEMBER_COUNT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var SRANDMEMBER_1 = require_SRANDMEMBER();
    var SRANDMEMBER_2 = require_SRANDMEMBER();
    Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
      return SRANDMEMBER_2.FIRST_KEY_INDEX;
    } });
    function transformArguments(key2, count) {
      return [
        ...(0, SRANDMEMBER_1.transformArguments)(key2),
        count.toString()
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SREM.js
var require_SREM = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SREM.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, members) {
      return (0, generic_transformers_1.pushVerdictArguments)(["SREM", key2], members);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SSCAN.js
var require_SSCAN = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SSCAN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, cursor, options) {
      return (0, generic_transformers_1.pushScanArguments)([
        "SSCAN",
        key2
      ], cursor, options);
    }
    exports.transformArguments = transformArguments;
    function transformReply([cursor, members]) {
      return {
        cursor: Number(cursor),
        members
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/STRLEN.js
var require_STRLEN = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/STRLEN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2) {
      return ["STRLEN", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SUNION.js
var require_SUNION = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SUNION.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(keys) {
      return (0, generic_transformers_1.pushVerdictArguments)(["SUNION"], keys);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SUNIONSTORE.js
var require_SUNIONSTORE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SUNIONSTORE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(destination, keys) {
      return (0, generic_transformers_1.pushVerdictArguments)(["SUNIONSTORE", destination], keys);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/TOUCH.js
var require_TOUCH = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/TOUCH.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2) {
      return (0, generic_transformers_1.pushVerdictArguments)(["TOUCH"], key2);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/TTL.js
var require_TTL = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/TTL.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2) {
      return ["TTL", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/TYPE.js
var require_TYPE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/TYPE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2) {
      return ["TYPE", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/UNLINK.js
var require_UNLINK = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/UNLINK.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2) {
      return (0, generic_transformers_1.pushVerdictArguments)(["UNLINK"], key2);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/WATCH.js
var require_WATCH = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/WATCH.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    var generic_transformers_1 = require_generic_transformers();
    function transformArguments(key2) {
      return (0, generic_transformers_1.pushVerdictArguments)(["WATCH"], key2);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XACK.js
var require_XACK = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XACK.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, group, id) {
      return (0, generic_transformers_1.pushVerdictArguments)(["XACK", key2, group], id);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XADD.js
var require_XADD = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XADD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, id, message, options) {
      const args = ["XADD", key2];
      if (options === null || options === void 0 ? void 0 : options.NOMKSTREAM) {
        args.push("NOMKSTREAM");
      }
      if (options === null || options === void 0 ? void 0 : options.TRIM) {
        if (options.TRIM.strategy) {
          args.push(options.TRIM.strategy);
        }
        if (options.TRIM.strategyModifier) {
          args.push(options.TRIM.strategyModifier);
        }
        args.push(options.TRIM.threshold.toString());
        if (options.TRIM.limit) {
          args.push("LIMIT", options.TRIM.limit.toString());
        }
      }
      args.push(id);
      for (const [key3, value] of Object.entries(message)) {
        args.push(key3, value);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XAUTOCLAIM.js
var require_XAUTOCLAIM = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XAUTOCLAIM.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, group, consumer, minIdleTime, start, options) {
      const args = ["XAUTOCLAIM", key2, group, consumer, minIdleTime.toString(), start];
      if (options === null || options === void 0 ? void 0 : options.COUNT) {
        args.push("COUNT", options.COUNT.toString());
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return {
        nextId: reply[0],
        messages: (0, generic_transformers_1.transformStreamMessagesReply)(reply[1])
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XAUTOCLAIM_JUSTID.js
var require_XAUTOCLAIM_JUSTID = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XAUTOCLAIM_JUSTID.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var XAUTOCLAIM_1 = require_XAUTOCLAIM();
    var XAUTOCLAIM_2 = require_XAUTOCLAIM();
    Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
      return XAUTOCLAIM_2.FIRST_KEY_INDEX;
    } });
    function transformArguments(...args) {
      return [
        ...(0, XAUTOCLAIM_1.transformArguments)(...args),
        "JUSTID"
      ];
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return {
        nextId: reply[0],
        messages: reply[1]
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XCLAIM.js
var require_XCLAIM = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XCLAIM.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, group, consumer, minIdleTime, id, options) {
      const args = ["XCLAIM", key2, group, consumer, minIdleTime.toString()];
      (0, generic_transformers_1.pushVerdictArguments)(args, id);
      if (options === null || options === void 0 ? void 0 : options.IDLE) {
        args.push("IDLE", options.IDLE.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.TIME) {
        args.push("TIME", (typeof options.TIME === "number" ? options.TIME : options.TIME.getTime()).toString());
      }
      if (options === null || options === void 0 ? void 0 : options.RETRYCOUNT) {
        args.push("RETRYCOUNT", options.RETRYCOUNT.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.FORCE) {
        args.push("FORCE");
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_2 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_2.transformStreamMessagesReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XCLAIM_JUSTID.js
var require_XCLAIM_JUSTID = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XCLAIM_JUSTID.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var XCLAIM_1 = require_XCLAIM();
    var XCLAIM_2 = require_XCLAIM();
    Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
      return XCLAIM_2.FIRST_KEY_INDEX;
    } });
    function transformArguments(...args) {
      return [
        ...(0, XCLAIM_1.transformArguments)(...args),
        "JUSTID"
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XDEL.js
var require_XDEL = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XDEL.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, id) {
      return (0, generic_transformers_1.pushVerdictArguments)(["XDEL", key2], id);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XGROUP_CREATE.js
var require_XGROUP_CREATE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XGROUP_CREATE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 2;
    function transformArguments(key2, group, id, options) {
      const args = ["XGROUP", "CREATE", key2, group, id];
      if (options === null || options === void 0 ? void 0 : options.MKSTREAM) {
        args.push("MKSTREAM");
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XGROUP_CREATECONSUMER.js
var require_XGROUP_CREATECONSUMER = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XGROUP_CREATECONSUMER.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 2;
    function transformArguments(key2, group, consumer) {
      return ["XGROUP", "CREATECONSUMER", key2, group, consumer];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XGROUP_DELCONSUMER.js
var require_XGROUP_DELCONSUMER = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XGROUP_DELCONSUMER.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 2;
    function transformArguments(key2, group, consumer) {
      return ["XGROUP", "DELCONSUMER", key2, group, consumer];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XGROUP_DESTROY.js
var require_XGROUP_DESTROY = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XGROUP_DESTROY.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 2;
    function transformArguments(key2, group) {
      return ["XGROUP", "DESTROY", key2, group];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XGROUP_SETID.js
var require_XGROUP_SETID = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XGROUP_SETID.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 2;
    function transformArguments(key2, group, id) {
      return ["XGROUP", "SETID", key2, group, id];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XINFO_CONSUMERS.js
var require_XINFO_CONSUMERS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XINFO_CONSUMERS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 2;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, group) {
      return ["XINFO", "CONSUMERS", key2, group];
    }
    exports.transformArguments = transformArguments;
    function transformReply(rawReply) {
      return rawReply.map((consumer) => ({
        name: consumer[1],
        pending: consumer[3],
        idle: consumer[5]
      }));
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XINFO_GROUPS.js
var require_XINFO_GROUPS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XINFO_GROUPS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 2;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2) {
      return ["XINFO", "GROUPS", key2];
    }
    exports.transformArguments = transformArguments;
    function transformReply(rawReply) {
      return rawReply.map((group) => ({
        name: group[1],
        consumers: group[3],
        pending: group[5],
        lastDeliveredId: group[7]
      }));
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XINFO_STREAM.js
var require_XINFO_STREAM = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XINFO_STREAM.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 2;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2) {
      return ["XINFO", "STREAM", key2];
    }
    exports.transformArguments = transformArguments;
    function transformReply(rawReply) {
      const parsedReply = {};
      for (let i2 = 0; i2 < rawReply.length; i2 += 2) {
        switch (rawReply[i2]) {
          case "length":
            parsedReply.length = rawReply[i2 + 1];
            break;
          case "radix-tree-keys":
            parsedReply.radixTreeKeys = rawReply[i2 + 1];
            break;
          case "radix-tree-nodes":
            parsedReply.radixTreeNodes = rawReply[i2 + 1];
            break;
          case "groups":
            parsedReply.groups = rawReply[i2 + 1];
            break;
          case "last-generated-id":
            parsedReply.lastGeneratedId = rawReply[i2 + 1];
            break;
          case "first-entry":
            parsedReply.firstEntry = rawReply[i2 + 1] ? {
              id: rawReply[i2 + 1][0],
              message: (0, generic_transformers_1.transformTuplesReply)(rawReply[i2 + 1][1])
            } : null;
            break;
          case "last-entry":
            parsedReply.lastEntry = rawReply[i2 + 1] ? {
              id: rawReply[i2 + 1][0],
              message: (0, generic_transformers_1.transformTuplesReply)(rawReply[i2 + 1][1])
            } : null;
            break;
        }
      }
      return parsedReply;
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XLEN.js
var require_XLEN = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XLEN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2) {
      return ["XLEN", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XPENDING_RANGE.js
var require_XPENDING_RANGE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XPENDING_RANGE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, group, start, end, count, options) {
      const args = ["XPENDING", key2, group];
      if (options === null || options === void 0 ? void 0 : options.IDLE) {
        args.push("IDLE", options.IDLE.toString());
      }
      args.push(start, end, count.toString());
      if (options === null || options === void 0 ? void 0 : options.consumer) {
        args.push(options.consumer);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return reply.map(([id, owner, millisecondsSinceLastDelivery, deliveriesCounter]) => ({
        id,
        owner,
        millisecondsSinceLastDelivery,
        deliveriesCounter
      }));
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XPENDING.js
var require_XPENDING = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XPENDING.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, group) {
      return ["XPENDING", key2, group];
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return {
        pending: reply[0],
        firstId: reply[1],
        lastId: reply[2],
        consumers: reply[3] === null ? null : reply[3].map(([name, deliveriesCounter]) => ({
          name,
          deliveriesCounter: Number(deliveriesCounter)
        }))
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XRANGE.js
var require_XRANGE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XRANGE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, start, end, options) {
      const args = ["XRANGE", key2, start, end];
      if (options === null || options === void 0 ? void 0 : options.COUNT) {
        args.push("COUNT", options.COUNT.toString());
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformStreamMessagesReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XREAD.js
var require_XREAD = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XREAD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var FIRST_KEY_INDEX = (streams) => {
      return Array.isArray(streams) ? streams[0].key : streams.key;
    };
    exports.FIRST_KEY_INDEX = FIRST_KEY_INDEX;
    exports.IS_READ_ONLY = true;
    function transformArguments(streams, options) {
      const args = ["XREAD"];
      if (options === null || options === void 0 ? void 0 : options.COUNT) {
        args.push("COUNT", options.COUNT.toString());
      }
      if (typeof (options === null || options === void 0 ? void 0 : options.BLOCK) === "number") {
        args.push("BLOCK", options.BLOCK.toString());
      }
      args.push("STREAMS");
      const streamsArray = Array.isArray(streams) ? streams : [streams], argsLength = args.length;
      for (let i2 = 0; i2 < streamsArray.length; i2++) {
        const stream = streamsArray[i2];
        args[argsLength + i2] = stream.key;
        args[argsLength + streamsArray.length + i2] = stream.id;
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformStreamsMessagesReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XREADGROUP.js
var require_XREADGROUP = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XREADGROUP.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var FIRST_KEY_INDEX = (_group, _consumer, streams) => {
      return Array.isArray(streams) ? streams[0].key : streams.key;
    };
    exports.FIRST_KEY_INDEX = FIRST_KEY_INDEX;
    exports.IS_READ_ONLY = true;
    function transformArguments(group, consumer, streams, options) {
      const args = ["XREADGROUP", "GROUP", group, consumer];
      if (options === null || options === void 0 ? void 0 : options.COUNT) {
        args.push("COUNT", options.COUNT.toString());
      }
      if (typeof (options === null || options === void 0 ? void 0 : options.BLOCK) === "number") {
        args.push("BLOCK", options.BLOCK.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.NOACK) {
        args.push("NOACK");
      }
      args.push("STREAMS");
      const streamsArray = Array.isArray(streams) ? streams : [streams], argsLength = args.length;
      for (let i2 = 0; i2 < streamsArray.length; i2++) {
        const stream = streamsArray[i2];
        args[argsLength + i2] = stream.key;
        args[argsLength + streamsArray.length + i2] = stream.id;
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformStreamsMessagesReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XREVRANGE.js
var require_XREVRANGE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XREVRANGE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, start, end, options) {
      const args = ["XREVRANGE", key2, start, end];
      if (options === null || options === void 0 ? void 0 : options.COUNT) {
        args.push("COUNT", options.COUNT.toString());
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformStreamMessagesReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XTRIM.js
var require_XTRIM = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/XTRIM.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, strategy, threshold, options) {
      const args = ["XTRIM", key2, strategy];
      if (options === null || options === void 0 ? void 0 : options.strategyModifier) {
        args.push(options.strategyModifier);
      }
      args.push(threshold.toString());
      if (options === null || options === void 0 ? void 0 : options.LIMIT) {
        args.push("LIMIT", options.LIMIT.toString());
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZADD.js
var require_ZADD = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZADD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, members, options) {
      var _a4, _b, _c, _d2, _e, _f;
      const args = ["ZADD", key2];
      if ((_a4 = options) === null || _a4 === void 0 ? void 0 : _a4.NX) {
        args.push("NX");
      } else {
        if ((_b = options) === null || _b === void 0 ? void 0 : _b.XX) {
          args.push("XX");
        }
        if ((_c = options) === null || _c === void 0 ? void 0 : _c.GT) {
          args.push("GT");
        } else if ((_d2 = options) === null || _d2 === void 0 ? void 0 : _d2.LT) {
          args.push("LT");
        }
      }
      if ((_e = options) === null || _e === void 0 ? void 0 : _e.CH) {
        args.push("CH");
      }
      if ((_f = options) === null || _f === void 0 ? void 0 : _f.INCR) {
        args.push("INCR");
      }
      for (const { score, value } of Array.isArray(members) ? members : [members]) {
        args.push((0, generic_transformers_1.transformNumberInfinityArgument)(score), value);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_2 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_2.transformNumberInfinityReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZCARD.js
var require_ZCARD = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZCARD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2) {
      return ["ZCARD", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZCOUNT.js
var require_ZCOUNT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZCOUNT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, min, max) {
      return [
        "ZCOUNT",
        key2,
        (0, generic_transformers_1.transformStringNumberInfinityArgument)(min),
        (0, generic_transformers_1.transformStringNumberInfinityArgument)(max)
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZDIFF.js
var require_ZDIFF = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZDIFF.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 2;
    exports.IS_READ_ONLY = true;
    function transformArguments(keys) {
      return (0, generic_transformers_1.pushVerdictArgument)(["ZDIFF"], keys);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZDIFF_WITHSCORES.js
var require_ZDIFF_WITHSCORES = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZDIFF_WITHSCORES.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var ZDIFF_1 = require_ZDIFF();
    var ZDIFF_2 = require_ZDIFF();
    Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
      return ZDIFF_2.FIRST_KEY_INDEX;
    } });
    Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
      return ZDIFF_2.IS_READ_ONLY;
    } });
    function transformArguments(...args) {
      return [
        ...(0, ZDIFF_1.transformArguments)(...args),
        "WITHSCORES"
      ];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformSortedSetWithScoresReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZDIFFSTORE.js
var require_ZDIFFSTORE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZDIFFSTORE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(destination, keys) {
      return (0, generic_transformers_1.pushVerdictArgument)(["ZDIFFSTORE", destination], keys);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZINCRBY.js
var require_ZINCRBY = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZINCRBY.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, increment, member) {
      return [
        "ZINCRBY",
        key2,
        (0, generic_transformers_1.transformNumberInfinityArgument)(increment),
        member
      ];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_2 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_2.transformNumberInfinityReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZINTER.js
var require_ZINTER = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZINTER.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 2;
    exports.IS_READ_ONLY = true;
    function transformArguments(keys, options) {
      const args = (0, generic_transformers_1.pushVerdictArgument)(["ZINTER"], keys);
      if (options === null || options === void 0 ? void 0 : options.WEIGHTS) {
        args.push("WEIGHTS", ...options.WEIGHTS.map((weight) => weight.toString()));
      }
      if (options === null || options === void 0 ? void 0 : options.AGGREGATE) {
        args.push("AGGREGATE", options.AGGREGATE);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZINTER_WITHSCORES.js
var require_ZINTER_WITHSCORES = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZINTER_WITHSCORES.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var ZINTER_1 = require_ZINTER();
    var ZINTER_2 = require_ZINTER();
    Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
      return ZINTER_2.FIRST_KEY_INDEX;
    } });
    Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
      return ZINTER_2.IS_READ_ONLY;
    } });
    function transformArguments(...args) {
      return [
        ...(0, ZINTER_1.transformArguments)(...args),
        "WITHSCORES"
      ];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformSortedSetWithScoresReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZINTERSTORE.js
var require_ZINTERSTORE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZINTERSTORE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(destination, keys, options) {
      const args = (0, generic_transformers_1.pushVerdictArgument)(["ZINTERSTORE", destination], keys);
      if (options === null || options === void 0 ? void 0 : options.WEIGHTS) {
        args.push("WEIGHTS", ...options.WEIGHTS.map((weight) => weight.toString()));
      }
      if (options === null || options === void 0 ? void 0 : options.AGGREGATE) {
        args.push("AGGREGATE", options.AGGREGATE);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZLEXCOUNT.js
var require_ZLEXCOUNT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZLEXCOUNT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, min, max) {
      return [
        "ZLEXCOUNT",
        key2,
        min,
        max
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZMSCORE.js
var require_ZMSCORE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZMSCORE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, member) {
      return (0, generic_transformers_1.pushVerdictArguments)(["ZMSCORE", key2], member);
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_2 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_2.transformNumberInfinityNullArrayReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZPOPMAX.js
var require_ZPOPMAX = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZPOPMAX.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2) {
      return [
        "ZPOPMAX",
        key2
      ];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformSortedSetMemberNullReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZPOPMAX_COUNT.js
var require_ZPOPMAX_COUNT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZPOPMAX_COUNT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var ZPOPMAX_1 = require_ZPOPMAX();
    var ZPOPMAX_2 = require_ZPOPMAX();
    Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
      return ZPOPMAX_2.FIRST_KEY_INDEX;
    } });
    function transformArguments(key2, count) {
      return [
        ...(0, ZPOPMAX_1.transformArguments)(key2),
        count.toString()
      ];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformSortedSetWithScoresReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZPOPMIN.js
var require_ZPOPMIN = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZPOPMIN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2) {
      return [
        "ZPOPMIN",
        key2
      ];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformSortedSetMemberNullReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZPOPMIN_COUNT.js
var require_ZPOPMIN_COUNT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZPOPMIN_COUNT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var ZPOPMIN_1 = require_ZPOPMIN();
    var ZPOPMIN_2 = require_ZPOPMIN();
    Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
      return ZPOPMIN_2.FIRST_KEY_INDEX;
    } });
    function transformArguments(key2, count) {
      return [
        ...(0, ZPOPMIN_1.transformArguments)(key2),
        count.toString()
      ];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformSortedSetWithScoresReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZRANDMEMBER.js
var require_ZRANDMEMBER = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZRANDMEMBER.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2) {
      return ["ZRANDMEMBER", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZRANDMEMBER_COUNT.js
var require_ZRANDMEMBER_COUNT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZRANDMEMBER_COUNT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var ZRANDMEMBER_1 = require_ZRANDMEMBER();
    var ZRANDMEMBER_2 = require_ZRANDMEMBER();
    Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
      return ZRANDMEMBER_2.FIRST_KEY_INDEX;
    } });
    Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
      return ZRANDMEMBER_2.IS_READ_ONLY;
    } });
    function transformArguments(key2, count) {
      return [
        ...(0, ZRANDMEMBER_1.transformArguments)(key2),
        count.toString()
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZRANDMEMBER_COUNT_WITHSCORES.js
var require_ZRANDMEMBER_COUNT_WITHSCORES = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZRANDMEMBER_COUNT_WITHSCORES.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var ZRANDMEMBER_COUNT_1 = require_ZRANDMEMBER_COUNT();
    var ZRANDMEMBER_COUNT_2 = require_ZRANDMEMBER_COUNT();
    Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
      return ZRANDMEMBER_COUNT_2.FIRST_KEY_INDEX;
    } });
    Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
      return ZRANDMEMBER_COUNT_2.IS_READ_ONLY;
    } });
    function transformArguments(...args) {
      return [
        ...(0, ZRANDMEMBER_COUNT_1.transformArguments)(...args),
        "WITHSCORES"
      ];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformSortedSetWithScoresReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZRANGE.js
var require_ZRANGE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZRANGE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, min, max, options) {
      const args = [
        "ZRANGE",
        key2,
        (0, generic_transformers_1.transformStringNumberInfinityArgument)(min),
        (0, generic_transformers_1.transformStringNumberInfinityArgument)(max)
      ];
      switch (options === null || options === void 0 ? void 0 : options.BY) {
        case "SCORE":
          args.push("BYSCORE");
          break;
        case "LEX":
          args.push("BYLEX");
          break;
      }
      if (options === null || options === void 0 ? void 0 : options.REV) {
        args.push("REV");
      }
      if (options === null || options === void 0 ? void 0 : options.LIMIT) {
        args.push("LIMIT", options.LIMIT.offset.toString(), options.LIMIT.count.toString());
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZRANGE_WITHSCORES.js
var require_ZRANGE_WITHSCORES = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZRANGE_WITHSCORES.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var ZRANGE_1 = require_ZRANGE();
    var ZRANGE_2 = require_ZRANGE();
    Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
      return ZRANGE_2.FIRST_KEY_INDEX;
    } });
    Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
      return ZRANGE_2.IS_READ_ONLY;
    } });
    function transformArguments(...args) {
      return [
        ...(0, ZRANGE_1.transformArguments)(...args),
        "WITHSCORES"
      ];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformSortedSetWithScoresReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZRANGEBYLEX.js
var require_ZRANGEBYLEX = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZRANGEBYLEX.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, min, max, options) {
      const args = [
        "ZRANGEBYLEX",
        key2,
        (0, generic_transformers_1.transformStringNumberInfinityArgument)(min),
        (0, generic_transformers_1.transformStringNumberInfinityArgument)(max)
      ];
      if (options === null || options === void 0 ? void 0 : options.LIMIT) {
        args.push("LIMIT", options.LIMIT.offset.toString(), options.LIMIT.count.toString());
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZRANGEBYSCORE.js
var require_ZRANGEBYSCORE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZRANGEBYSCORE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, min, max, options) {
      const args = [
        "ZRANGEBYSCORE",
        key2,
        (0, generic_transformers_1.transformStringNumberInfinityArgument)(min),
        (0, generic_transformers_1.transformStringNumberInfinityArgument)(max)
      ];
      if (options === null || options === void 0 ? void 0 : options.LIMIT) {
        args.push("LIMIT", options.LIMIT.offset.toString(), options.LIMIT.count.toString());
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZRANGEBYSCORE_WITHSCORES.js
var require_ZRANGEBYSCORE_WITHSCORES = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZRANGEBYSCORE_WITHSCORES.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var ZRANGEBYSCORE_1 = require_ZRANGEBYSCORE();
    var ZRANGEBYSCORE_2 = require_ZRANGEBYSCORE();
    Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
      return ZRANGEBYSCORE_2.FIRST_KEY_INDEX;
    } });
    Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
      return ZRANGEBYSCORE_2.IS_READ_ONLY;
    } });
    function transformArguments(key2, min, max, options) {
      return [
        ...(0, ZRANGEBYSCORE_1.transformArguments)(key2, min, max, options),
        "WITHSCORES"
      ];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformSortedSetWithScoresReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZRANGESTORE.js
var require_ZRANGESTORE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZRANGESTORE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(dst, src, min, max, options) {
      const args = [
        "ZRANGESTORE",
        dst,
        src,
        (0, generic_transformers_1.transformStringNumberInfinityArgument)(min),
        (0, generic_transformers_1.transformStringNumberInfinityArgument)(max)
      ];
      switch (options === null || options === void 0 ? void 0 : options.BY) {
        case "SCORE":
          args.push("BYSCORE");
          break;
        case "LEX":
          args.push("BYLEX");
          break;
      }
      if (options === null || options === void 0 ? void 0 : options.REV) {
        args.push("REV");
      }
      if (options === null || options === void 0 ? void 0 : options.LIMIT) {
        args.push("LIMIT", options.LIMIT.offset.toString(), options.LIMIT.count.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.WITHSCORES) {
        args.push("WITHSCORES");
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      if (typeof reply !== "number") {
        throw new TypeError(`Upgrade to Redis 6.2.5 and up (https://github.com/redis/redis/pull/9089)`);
      }
      return reply;
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZRANK.js
var require_ZRANK = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZRANK.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, member) {
      return ["ZRANK", key2, member];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZREM.js
var require_ZREM = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZREM.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, member) {
      return (0, generic_transformers_1.pushVerdictArguments)(["ZREM", key2], member);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZREMRANGEBYLEX.js
var require_ZREMRANGEBYLEX = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZREMRANGEBYLEX.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, min, max) {
      return [
        "ZREMRANGEBYLEX",
        key2,
        (0, generic_transformers_1.transformStringNumberInfinityArgument)(min),
        (0, generic_transformers_1.transformStringNumberInfinityArgument)(max)
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZREMRANGEBYRANK.js
var require_ZREMRANGEBYRANK = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZREMRANGEBYRANK.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, start, stop) {
      return ["ZREMRANGEBYRANK", key2, start.toString(), stop.toString()];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZREMRANGEBYSCORE.js
var require_ZREMRANGEBYSCORE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZREMRANGEBYSCORE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, min, max) {
      return [
        "ZREMRANGEBYSCORE",
        key2,
        (0, generic_transformers_1.transformStringNumberInfinityArgument)(min),
        (0, generic_transformers_1.transformStringNumberInfinityArgument)(max)
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZREVRANK.js
var require_ZREVRANK = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZREVRANK.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, member) {
      return ["ZREVRANK", key2, member];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZSCAN.js
var require_ZSCAN = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZSCAN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, cursor, options) {
      return (0, generic_transformers_1.pushScanArguments)([
        "ZSCAN",
        key2
      ], cursor, options);
    }
    exports.transformArguments = transformArguments;
    function transformReply([cursor, rawMembers]) {
      const parsedMembers = [];
      for (let i2 = 0; i2 < rawMembers.length; i2 += 2) {
        parsedMembers.push({
          value: rawMembers[i2],
          score: (0, generic_transformers_1.transformNumberInfinityReply)(rawMembers[i2 + 1])
        });
      }
      return {
        cursor: Number(cursor),
        members: parsedMembers
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZSCORE.js
var require_ZSCORE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZSCORE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, member) {
      return ["ZSCORE", key2, member];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformNumberInfinityNullReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZUNION.js
var require_ZUNION = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZUNION.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 2;
    exports.IS_READ_ONLY = true;
    function transformArguments(keys, options) {
      const args = (0, generic_transformers_1.pushVerdictArgument)(["ZUNION"], keys);
      if (options === null || options === void 0 ? void 0 : options.WEIGHTS) {
        args.push("WEIGHTS", ...options.WEIGHTS.map((weight) => weight.toString()));
      }
      if (options === null || options === void 0 ? void 0 : options.AGGREGATE) {
        args.push("AGGREGATE", options.AGGREGATE);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZUNION_WITHSCORES.js
var require_ZUNION_WITHSCORES = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZUNION_WITHSCORES.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var ZUNION_1 = require_ZUNION();
    var ZUNION_2 = require_ZUNION();
    Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
      return ZUNION_2.FIRST_KEY_INDEX;
    } });
    Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
      return ZUNION_2.IS_READ_ONLY;
    } });
    function transformArguments(...args) {
      return [
        ...(0, ZUNION_1.transformArguments)(...args),
        "WITHSCORES"
      ];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformSortedSetWithScoresReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZUNIONSTORE.js
var require_ZUNIONSTORE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ZUNIONSTORE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(destination, keys, options) {
      const args = (0, generic_transformers_1.pushVerdictArgument)(["ZUNIONSTORE", destination], keys);
      if (options === null || options === void 0 ? void 0 : options.WEIGHTS) {
        args.push("WEIGHTS", ...options.WEIGHTS.map((weight) => weight.toString()));
      }
      if (options === null || options === void 0 ? void 0 : options.AGGREGATE) {
        args.push("AGGREGATE", options.AGGREGATE);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/cluster/commands.js
var require_commands = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/cluster/commands.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var APPEND = require_APPEND();
    var BITCOUNT = require_BITCOUNT();
    var BITFIELD = require_BITFIELD();
    var BITOP = require_BITOP();
    var BITPOS = require_BITPOS();
    var BLMOVE = require_BLMOVE();
    var BLPOP = require_BLPOP();
    var BRPOP = require_BRPOP();
    var BRPOPLPUSH = require_BRPOPLPUSH();
    var BZPOPMAX = require_BZPOPMAX();
    var BZPOPMIN = require_BZPOPMIN();
    var COPY = require_COPY();
    var DECR = require_DECR();
    var DECRBY = require_DECRBY();
    var DEL = require_DEL();
    var DUMP = require_DUMP();
    var EVAL = require_EVAL();
    var EVALSHA = require_EVALSHA();
    var EXISTS = require_EXISTS();
    var EXPIRE = require_EXPIRE();
    var EXPIREAT = require_EXPIREAT();
    var GEOADD = require_GEOADD();
    var GEODIST = require_GEODIST();
    var GEOHASH = require_GEOHASH();
    var GEOPOS = require_GEOPOS();
    var GEOSEARCH_WITH = require_GEOSEARCH_WITH();
    var GEOSEARCH = require_GEOSEARCH();
    var GEOSEARCHSTORE = require_GEOSEARCHSTORE();
    var GET = require_GET();
    var GETBIT = require_GETBIT();
    var GETDEL = require_GETDEL();
    var GETEX = require_GETEX();
    var GETRANGE = require_GETRANGE();
    var GETSET = require_GETSET();
    var HDEL = require_HDEL();
    var HEXISTS = require_HEXISTS();
    var HGET = require_HGET();
    var HGETALL = require_HGETALL();
    var HINCRBY = require_HINCRBY();
    var HINCRBYFLOAT = require_HINCRBYFLOAT();
    var HKEYS = require_HKEYS();
    var HLEN = require_HLEN();
    var HMGET = require_HMGET();
    var HRANDFIELD_COUNT_WITHVALUES = require_HRANDFIELD_COUNT_WITHVALUES();
    var HRANDFIELD_COUNT = require_HRANDFIELD_COUNT();
    var HRANDFIELD = require_HRANDFIELD();
    var HSCAN = require_HSCAN();
    var HSET = require_HSET();
    var HSETNX = require_HSETNX();
    var HSTRLEN = require_HSTRLEN();
    var HVALS = require_HVALS();
    var INCR = require_INCR();
    var INCRBY = require_INCRBY();
    var INCRBYFLOAT = require_INCRBYFLOAT();
    var LINDEX = require_LINDEX();
    var LINSERT = require_LINSERT();
    var LLEN = require_LLEN();
    var LMOVE = require_LMOVE();
    var LPOP_COUNT = require_LPOP_COUNT();
    var LPOP = require_LPOP();
    var LPOS_COUNT = require_LPOS_COUNT();
    var LPOS = require_LPOS();
    var LPUSH = require_LPUSH();
    var LPUSHX = require_LPUSHX();
    var LRANGE = require_LRANGE();
    var LREM = require_LREM();
    var LSET = require_LSET();
    var LTRIM = require_LTRIM();
    var MGET = require_MGET();
    var MIGRATE = require_MIGRATE();
    var MSET = require_MSET();
    var MSETNX = require_MSETNX();
    var PERSIST = require_PERSIST();
    var PEXPIRE = require_PEXPIRE();
    var PEXPIREAT = require_PEXPIREAT();
    var PFADD = require_PFADD();
    var PFCOUNT = require_PFCOUNT();
    var PFMERGE = require_PFMERGE();
    var PSETEX = require_PSETEX();
    var PTTL = require_PTTL();
    var PUBLISH = require_PUBLISH();
    var RENAME = require_RENAME();
    var RENAMENX = require_RENAMENX();
    var RPOP_COUNT = require_RPOP_COUNT();
    var RPOP = require_RPOP();
    var RPOPLPUSH = require_RPOPLPUSH();
    var RPUSH = require_RPUSH();
    var RPUSHX = require_RPUSHX();
    var SADD = require_SADD();
    var SCARD = require_SCARD();
    var SDIFF = require_SDIFF();
    var SDIFFSTORE = require_SDIFFSTORE();
    var SET = require_SET();
    var SETBIT = require_SETBIT();
    var SETEX = require_SETEX();
    var SETNX = require_SETNX();
    var SETRANGE = require_SETRANGE();
    var SINTER = require_SINTER();
    var SINTERSTORE = require_SINTERSTORE();
    var SISMEMBER = require_SISMEMBER();
    var SMEMBERS = require_SMEMBERS();
    var SMISMEMBER = require_SMISMEMBER();
    var SMOVE = require_SMOVE();
    var SORT = require_SORT();
    var SPOP = require_SPOP();
    var SRANDMEMBER_COUNT = require_SRANDMEMBER_COUNT();
    var SRANDMEMBER = require_SRANDMEMBER();
    var SREM = require_SREM();
    var SSCAN = require_SSCAN();
    var STRLEN = require_STRLEN();
    var SUNION = require_SUNION();
    var SUNIONSTORE = require_SUNIONSTORE();
    var TOUCH = require_TOUCH();
    var TTL = require_TTL();
    var TYPE = require_TYPE();
    var UNLINK = require_UNLINK();
    var WATCH = require_WATCH();
    var XACK = require_XACK();
    var XADD = require_XADD();
    var XAUTOCLAIM_JUSTID = require_XAUTOCLAIM_JUSTID();
    var XAUTOCLAIM = require_XAUTOCLAIM();
    var XCLAIM_JUSTID = require_XCLAIM_JUSTID();
    var XCLAIM = require_XCLAIM();
    var XDEL = require_XDEL();
    var XGROUP_CREATE = require_XGROUP_CREATE();
    var XGROUP_CREATECONSUMER = require_XGROUP_CREATECONSUMER();
    var XGROUP_DELCONSUMER = require_XGROUP_DELCONSUMER();
    var XGROUP_DESTROY = require_XGROUP_DESTROY();
    var XGROUP_SETID = require_XGROUP_SETID();
    var XINFO_CONSUMERS = require_XINFO_CONSUMERS();
    var XINFO_GROUPS = require_XINFO_GROUPS();
    var XINFO_STREAM = require_XINFO_STREAM();
    var XLEN = require_XLEN();
    var XPENDING_RANGE = require_XPENDING_RANGE();
    var XPENDING = require_XPENDING();
    var XRANGE = require_XRANGE();
    var XREAD = require_XREAD();
    var XREADGROUP = require_XREADGROUP();
    var XREVRANGE = require_XREVRANGE();
    var XTRIM = require_XTRIM();
    var ZADD = require_ZADD();
    var ZCARD = require_ZCARD();
    var ZCOUNT = require_ZCOUNT();
    var ZDIFF_WITHSCORES = require_ZDIFF_WITHSCORES();
    var ZDIFF = require_ZDIFF();
    var ZDIFFSTORE = require_ZDIFFSTORE();
    var ZINCRBY = require_ZINCRBY();
    var ZINTER_WITHSCORES = require_ZINTER_WITHSCORES();
    var ZINTER = require_ZINTER();
    var ZINTERSTORE = require_ZINTERSTORE();
    var ZLEXCOUNT = require_ZLEXCOUNT();
    var ZMSCORE = require_ZMSCORE();
    var ZPOPMAX_COUNT = require_ZPOPMAX_COUNT();
    var ZPOPMAX = require_ZPOPMAX();
    var ZPOPMIN_COUNT = require_ZPOPMIN_COUNT();
    var ZPOPMIN = require_ZPOPMIN();
    var ZRANDMEMBER_COUNT_WITHSCORES = require_ZRANDMEMBER_COUNT_WITHSCORES();
    var ZRANDMEMBER_COUNT = require_ZRANDMEMBER_COUNT();
    var ZRANDMEMBER = require_ZRANDMEMBER();
    var ZRANGE_WITHSCORES = require_ZRANGE_WITHSCORES();
    var ZRANGE = require_ZRANGE();
    var ZRANGEBYLEX = require_ZRANGEBYLEX();
    var ZRANGEBYSCORE_WITHSCORES = require_ZRANGEBYSCORE_WITHSCORES();
    var ZRANGEBYSCORE = require_ZRANGEBYSCORE();
    var ZRANGESTORE = require_ZRANGESTORE();
    var ZRANK = require_ZRANK();
    var ZREM = require_ZREM();
    var ZREMRANGEBYLEX = require_ZREMRANGEBYLEX();
    var ZREMRANGEBYRANK = require_ZREMRANGEBYRANK();
    var ZREMRANGEBYSCORE = require_ZREMRANGEBYSCORE();
    var ZREVRANK = require_ZREVRANK();
    var ZSCAN = require_ZSCAN();
    var ZSCORE = require_ZSCORE();
    var ZUNION_WITHSCORES = require_ZUNION_WITHSCORES();
    var ZUNION = require_ZUNION();
    var ZUNIONSTORE = require_ZUNIONSTORE();
    exports.default = {
      APPEND,
      append: APPEND,
      BITCOUNT,
      bitCount: BITCOUNT,
      BITFIELD,
      bitField: BITFIELD,
      BITOP,
      bitOp: BITOP,
      BITPOS,
      bitPos: BITPOS,
      BLMOVE,
      blMove: BLMOVE,
      BLPOP,
      blPop: BLPOP,
      BRPOP,
      brPop: BRPOP,
      BRPOPLPUSH,
      brPopLPush: BRPOPLPUSH,
      BZPOPMAX,
      bzPopMax: BZPOPMAX,
      BZPOPMIN,
      bzPopMin: BZPOPMIN,
      COPY,
      copy: COPY,
      DECR,
      decr: DECR,
      DECRBY,
      decrBy: DECRBY,
      DEL,
      del: DEL,
      DUMP,
      dump: DUMP,
      EVAL,
      eval: EVAL,
      EVALSHA,
      evalSha: EVALSHA,
      EXISTS,
      exists: EXISTS,
      EXPIRE,
      expire: EXPIRE,
      EXPIREAT,
      expireAt: EXPIREAT,
      GEOADD,
      geoAdd: GEOADD,
      GEODIST,
      geoDist: GEODIST,
      GEOHASH,
      geoHash: GEOHASH,
      GEOPOS,
      geoPos: GEOPOS,
      GEOSEARCH_WITH,
      geoSearchWith: GEOSEARCH_WITH,
      GEOSEARCH,
      geoSearch: GEOSEARCH,
      GEOSEARCHSTORE,
      geoSearchStore: GEOSEARCHSTORE,
      GET,
      get: GET,
      GETBIT,
      getBit: GETBIT,
      GETDEL,
      getDel: GETDEL,
      GETEX,
      getEx: GETEX,
      GETRANGE,
      getRange: GETRANGE,
      GETSET,
      getSet: GETSET,
      HDEL,
      hDel: HDEL,
      HEXISTS,
      hExists: HEXISTS,
      HGET,
      hGet: HGET,
      HGETALL,
      hGetAll: HGETALL,
      HINCRBY,
      hIncrBy: HINCRBY,
      HINCRBYFLOAT,
      hIncrByFloat: HINCRBYFLOAT,
      HKEYS,
      hKeys: HKEYS,
      HLEN,
      hLen: HLEN,
      HMGET,
      hmGet: HMGET,
      HRANDFIELD_COUNT_WITHVALUES,
      hRandFieldCountWithValues: HRANDFIELD_COUNT_WITHVALUES,
      HRANDFIELD_COUNT,
      hRandFieldCount: HRANDFIELD_COUNT,
      HRANDFIELD,
      hRandField: HRANDFIELD,
      HSCAN,
      hScan: HSCAN,
      HSET,
      hSet: HSET,
      HSETNX,
      hSetNX: HSETNX,
      HSTRLEN,
      hStrLen: HSTRLEN,
      HVALS,
      hVals: HVALS,
      INCR,
      incr: INCR,
      INCRBY,
      incrBy: INCRBY,
      INCRBYFLOAT,
      incrByFloat: INCRBYFLOAT,
      LINDEX,
      lIndex: LINDEX,
      LINSERT,
      lInsert: LINSERT,
      LLEN,
      lLen: LLEN,
      LMOVE,
      lMove: LMOVE,
      LPOP_COUNT,
      lPopCount: LPOP_COUNT,
      LPOP,
      lPop: LPOP,
      LPOS_COUNT,
      lPosCount: LPOS_COUNT,
      LPOS,
      lPos: LPOS,
      LPUSH,
      lPush: LPUSH,
      LPUSHX,
      lPushX: LPUSHX,
      LRANGE,
      lRange: LRANGE,
      LREM,
      lRem: LREM,
      LSET,
      lSet: LSET,
      LTRIM,
      lTrim: LTRIM,
      MGET,
      mGet: MGET,
      MIGRATE,
      migrate: MIGRATE,
      MSET,
      mSet: MSET,
      MSETNX,
      mSetNX: MSETNX,
      PERSIST,
      persist: PERSIST,
      PEXPIRE,
      pExpire: PEXPIRE,
      PEXPIREAT,
      pExpireAt: PEXPIREAT,
      PFADD,
      pfAdd: PFADD,
      PFCOUNT,
      pfCount: PFCOUNT,
      PFMERGE,
      pfMerge: PFMERGE,
      PSETEX,
      pSetEx: PSETEX,
      PTTL,
      pTTL: PTTL,
      PUBLISH,
      publish: PUBLISH,
      RENAME,
      rename: RENAME,
      RENAMENX,
      renameNX: RENAMENX,
      RPOP_COUNT,
      rPopCount: RPOP_COUNT,
      RPOP,
      rPop: RPOP,
      RPOPLPUSH,
      rPopLPush: RPOPLPUSH,
      RPUSH,
      rPush: RPUSH,
      RPUSHX,
      rPushX: RPUSHX,
      SADD,
      sAdd: SADD,
      SCARD,
      sCard: SCARD,
      SDIFF,
      sDiff: SDIFF,
      SDIFFSTORE,
      sDiffStore: SDIFFSTORE,
      SINTER,
      sInter: SINTER,
      SINTERSTORE,
      sInterStore: SINTERSTORE,
      SET,
      set: SET,
      SETBIT,
      setBit: SETBIT,
      SETEX,
      setEx: SETEX,
      SETNX,
      setNX: SETNX,
      SETRANGE,
      setRange: SETRANGE,
      SISMEMBER,
      sIsMember: SISMEMBER,
      SMEMBERS,
      sMembers: SMEMBERS,
      SMISMEMBER,
      smIsMember: SMISMEMBER,
      SMOVE,
      sMove: SMOVE,
      SORT,
      sort: SORT,
      SPOP,
      sPop: SPOP,
      SRANDMEMBER_COUNT,
      sRandMemberCount: SRANDMEMBER_COUNT,
      SRANDMEMBER,
      sRandMember: SRANDMEMBER,
      SREM,
      sRem: SREM,
      SSCAN,
      sScan: SSCAN,
      STRLEN,
      strLen: STRLEN,
      SUNION,
      sUnion: SUNION,
      SUNIONSTORE,
      sUnionStore: SUNIONSTORE,
      TOUCH,
      touch: TOUCH,
      TTL,
      ttl: TTL,
      TYPE,
      type: TYPE,
      UNLINK,
      unlink: UNLINK,
      WATCH,
      watch: WATCH,
      XACK,
      xAck: XACK,
      XADD,
      xAdd: XADD,
      XAUTOCLAIM_JUSTID,
      xAutoClaimJustId: XAUTOCLAIM_JUSTID,
      XAUTOCLAIM,
      xAutoClaim: XAUTOCLAIM,
      XCLAIM,
      xClaim: XCLAIM,
      XCLAIM_JUSTID,
      xClaimJustId: XCLAIM_JUSTID,
      XDEL,
      xDel: XDEL,
      XGROUP_CREATE,
      xGroupCreate: XGROUP_CREATE,
      XGROUP_CREATECONSUMER,
      xGroupCreateConsumer: XGROUP_CREATECONSUMER,
      XGROUP_DELCONSUMER,
      xGroupDelConsumer: XGROUP_DELCONSUMER,
      XGROUP_DESTROY,
      xGroupDestroy: XGROUP_DESTROY,
      XGROUP_SETID,
      xGroupSetId: XGROUP_SETID,
      XINFO_CONSUMERS,
      xInfoConsumers: XINFO_CONSUMERS,
      XINFO_GROUPS,
      xInfoGroups: XINFO_GROUPS,
      XINFO_STREAM,
      xInfoStream: XINFO_STREAM,
      XLEN,
      xLen: XLEN,
      XPENDING_RANGE,
      xPendingRange: XPENDING_RANGE,
      XPENDING,
      xPending: XPENDING,
      XRANGE,
      xRange: XRANGE,
      XREAD,
      xRead: XREAD,
      XREADGROUP,
      xReadGroup: XREADGROUP,
      XREVRANGE,
      xRevRange: XREVRANGE,
      XTRIM,
      xTrim: XTRIM,
      ZADD,
      zAdd: ZADD,
      ZCARD,
      zCard: ZCARD,
      ZCOUNT,
      zCount: ZCOUNT,
      ZDIFF_WITHSCORES,
      zDiffWithScores: ZDIFF_WITHSCORES,
      ZDIFF,
      zDiff: ZDIFF,
      ZDIFFSTORE,
      zDiffStore: ZDIFFSTORE,
      ZINCRBY,
      zIncrBy: ZINCRBY,
      ZINTER_WITHSCORES,
      zInterWithScores: ZINTER_WITHSCORES,
      ZINTER,
      zInter: ZINTER,
      ZINTERSTORE,
      zInterStore: ZINTERSTORE,
      ZLEXCOUNT,
      zLexCount: ZLEXCOUNT,
      ZMSCORE,
      zmScore: ZMSCORE,
      ZPOPMAX_COUNT,
      zPopMaxCount: ZPOPMAX_COUNT,
      ZPOPMAX,
      zPopMax: ZPOPMAX,
      ZPOPMIN_COUNT,
      zPopMinCount: ZPOPMIN_COUNT,
      ZPOPMIN,
      zPopMin: ZPOPMIN,
      ZRANDMEMBER_COUNT_WITHSCORES,
      zRandMemberCountWithScores: ZRANDMEMBER_COUNT_WITHSCORES,
      ZRANDMEMBER_COUNT,
      zRandMemberCount: ZRANDMEMBER_COUNT,
      ZRANDMEMBER,
      zRandMember: ZRANDMEMBER,
      ZRANGE_WITHSCORES,
      zRangeWithScores: ZRANGE_WITHSCORES,
      ZRANGE,
      zRange: ZRANGE,
      ZRANGEBYLEX,
      zRangeByLex: ZRANGEBYLEX,
      ZRANGEBYSCORE_WITHSCORES,
      zRangeByScoreWithScores: ZRANGEBYSCORE_WITHSCORES,
      ZRANGEBYSCORE,
      zRangeByScore: ZRANGEBYSCORE,
      ZRANGESTORE,
      zRangeStore: ZRANGESTORE,
      ZRANK,
      zRank: ZRANK,
      ZREM,
      zRem: ZREM,
      ZREMRANGEBYLEX,
      zRemRangeByLex: ZREMRANGEBYLEX,
      ZREMRANGEBYRANK,
      zRemRangeByRank: ZREMRANGEBYRANK,
      ZREMRANGEBYSCORE,
      zRemRangeByScore: ZREMRANGEBYSCORE,
      ZREVRANK,
      zRevRank: ZREVRANK,
      ZSCAN,
      zScan: ZSCAN,
      ZSCORE,
      zScore: ZSCORE,
      ZUNION_WITHSCORES,
      zUnionWithScores: ZUNION_WITHSCORES,
      ZUNION,
      zUnion: ZUNION,
      ZUNIONSTORE,
      zUnionStore: ZUNIONSTORE
    };
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_CAT.js
var require_ACL_CAT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_CAT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(categoryName) {
      const args = ["ACL", "CAT"];
      if (categoryName) {
        args.push(categoryName);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_DELUSER.js
var require_ACL_DELUSER = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_DELUSER.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    var generic_transformers_1 = require_generic_transformers();
    function transformArguments(username) {
      return (0, generic_transformers_1.pushVerdictArguments)(["ACL", "DELUSER"], username);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_GENPASS.js
var require_ACL_GENPASS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_GENPASS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(bits) {
      const args = ["ACL", "GENPASS"];
      if (bits) {
        args.push(bits.toString());
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_GETUSER.js
var require_ACL_GETUSER = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_GETUSER.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = void 0;
    function transformArguments(username) {
      return ["ACL", "GETUSER", username];
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return {
        flags: reply[1],
        passwords: reply[3],
        commands: reply[5],
        keys: reply[7],
        channels: reply[9]
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_LIST.js
var require_ACL_LIST = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_LIST.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["ACL", "LIST"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_LOAD.js
var require_ACL_LOAD = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_LOAD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["ACL", "LOAD"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_LOG_RESET.js
var require_ACL_LOG_RESET = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_LOG_RESET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["ACL", "LOG", "RESET"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_LOG.js
var require_ACL_LOG = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_LOG.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = void 0;
    function transformArguments(count) {
      const args = ["ACL", "LOG"];
      if (count) {
        args.push(count.toString());
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return reply.map((log) => ({
        count: log[1],
        reason: log[3],
        context: log[5],
        object: log[7],
        username: log[9],
        ageSeconds: Number(log[11]),
        clientInfo: log[13]
      }));
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_SAVE.js
var require_ACL_SAVE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_SAVE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["ACL", "SAVE"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_SETUSER.js
var require_ACL_SETUSER = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_SETUSER.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    var generic_transformers_1 = require_generic_transformers();
    function transformArguments(username, rule) {
      return (0, generic_transformers_1.pushVerdictArguments)(["ACL", "SETUSER", username], rule);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_USERS.js
var require_ACL_USERS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_USERS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["ACL", "USERS"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_WHOAMI.js
var require_ACL_WHOAMI = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ACL_WHOAMI.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["ACL", "WHOAMI"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ASKING.js
var require_ASKING = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ASKING.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["ASKING"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/AUTH.js
var require_AUTH = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/AUTH.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments({ username, password }) {
      if (!username) {
        return ["AUTH", password];
      }
      return ["AUTH", username, password];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BGREWRITEAOF.js
var require_BGREWRITEAOF = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BGREWRITEAOF.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["BGREWRITEAOF"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BGSAVE.js
var require_BGSAVE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/BGSAVE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(options) {
      const args = ["BGSAVE"];
      if (options === null || options === void 0 ? void 0 : options.SCHEDULE) {
        args.push("SCHEDULE");
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLIENT_CACHING.js
var require_CLIENT_CACHING = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLIENT_CACHING.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(value) {
      return [
        "CLIENT",
        "CACHING",
        value ? "YES" : "NO"
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLIENT_GETNAME.js
var require_CLIENT_GETNAME = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLIENT_GETNAME.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["CLIENT", "GETNAME"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLIENT_GETREDIR.js
var require_CLIENT_GETREDIR = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLIENT_GETREDIR.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["CLIENT", "GETREDIR"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLIENT_ID.js
var require_CLIENT_ID = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLIENT_ID.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = void 0;
    exports.IS_READ_ONLY = true;
    function transformArguments() {
      return ["CLIENT", "ID"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLIENT_KILL.js
var require_CLIENT_KILL = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLIENT_KILL.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.ClientKillFilters = void 0;
    var ClientKillFilters;
    (function(ClientKillFilters2) {
      ClientKillFilters2["ADDRESS"] = "ADDR";
      ClientKillFilters2["LOCAL_ADDRESS"] = "LADDR";
      ClientKillFilters2["ID"] = "ID";
      ClientKillFilters2["TYPE"] = "TYPE";
      ClientKillFilters2["USER"] = "USER";
      ClientKillFilters2["SKIP_ME"] = "SKIPME";
    })(ClientKillFilters = exports.ClientKillFilters || (exports.ClientKillFilters = {}));
    function transformArguments(filters) {
      const args = ["CLIENT", "KILL"];
      if (Array.isArray(filters)) {
        for (const filter of filters) {
          pushFilter(args, filter);
        }
      } else {
        pushFilter(args, filters);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    function pushFilter(args, filter) {
      if (filter === ClientKillFilters.SKIP_ME) {
        args.push("SKIPME");
        return;
      }
      args.push(filter.filter);
      switch (filter.filter) {
        case ClientKillFilters.ADDRESS:
          args.push(filter.address);
          break;
        case ClientKillFilters.LOCAL_ADDRESS:
          args.push(filter.localAddress);
          break;
        case ClientKillFilters.ID:
          args.push(typeof filter.id === "number" ? filter.id.toString() : filter.id);
          break;
        case ClientKillFilters.TYPE:
          args.push(filter.type);
          break;
        case ClientKillFilters.USER:
          args.push(filter.username);
          break;
        case ClientKillFilters.SKIP_ME:
          args.push(filter.skipMe ? "yes" : "no");
          break;
      }
    }
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLIENT_SETNAME.js
var require_CLIENT_SETNAME = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLIENT_SETNAME.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(name) {
      return ["CLIENT", "SETNAME", name];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLIENT_INFO.js
var require_CLIENT_INFO = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLIENT_INFO.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = void 0;
    function transformArguments() {
      return ["CLIENT", "INFO"];
    }
    exports.transformArguments = transformArguments;
    var REGEX = /=([^\s]*)/g;
    function transformReply(reply) {
      const [[, id], [, addr], [, laddr], [, fd], [, name], [, age], [, idle], [, flags], [, db], [, sub], [, psub], [, multi], [, qbuf], [, qbufFree], [, argvMem], [, obl], [, oll], [, omem], [, totMem], [, events], [, cmd], [, user], [, redir]] = [...reply.matchAll(REGEX)];
      return {
        id: Number(id),
        addr,
        laddr,
        fd: Number(fd),
        name,
        age: Number(age),
        idle: Number(idle),
        flags,
        db: Number(db),
        sub: Number(sub),
        psub: Number(psub),
        multi: Number(multi),
        qbuf: Number(qbuf),
        qbufFree: Number(qbufFree),
        argvMem: Number(argvMem),
        obl: Number(obl),
        oll: Number(oll),
        omem: Number(omem),
        totMem: Number(totMem),
        events,
        cmd,
        user,
        redir: Number(redir)
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLUSTER_ADDSLOTS.js
var require_CLUSTER_ADDSLOTS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLUSTER_ADDSLOTS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(slots) {
      const args = ["CLUSTER", "ADDSLOTS"];
      if (typeof slots === "number") {
        args.push(slots.toString());
      } else {
        args.push(...slots.map(String));
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLUSTER_FLUSHSLOTS.js
var require_CLUSTER_FLUSHSLOTS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLUSTER_FLUSHSLOTS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["CLUSTER", "FLUSHSLOTS"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLUSTER_INFO.js
var require_CLUSTER_INFO = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLUSTER_INFO.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extractLineValue = exports.transformReply = exports.transformArguments = void 0;
    function transformArguments() {
      return ["CLUSTER", "INFO"];
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      const lines = reply.split("\r\n");
      return {
        state: extractLineValue(lines[0]),
        slots: {
          assigned: Number(extractLineValue(lines[1])),
          ok: Number(extractLineValue(lines[2])),
          pfail: Number(extractLineValue(lines[3])),
          fail: Number(extractLineValue(lines[4]))
        },
        knownNodes: Number(extractLineValue(lines[5])),
        size: Number(extractLineValue(lines[6])),
        currentEpoch: Number(extractLineValue(lines[7])),
        myEpoch: Number(extractLineValue(lines[8])),
        stats: {
          messagesSent: Number(extractLineValue(lines[9])),
          messagesReceived: Number(extractLineValue(lines[10]))
        }
      };
    }
    exports.transformReply = transformReply;
    function extractLineValue(line) {
      return line.substring(line.indexOf(":") + 1);
    }
    exports.extractLineValue = extractLineValue;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLUSTER_NODES.js
var require_CLUSTER_NODES = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLUSTER_NODES.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.RedisClusterNodeLinkStates = exports.transformArguments = void 0;
    function transformArguments() {
      return ["CLUSTER", "NODES"];
    }
    exports.transformArguments = transformArguments;
    var RedisClusterNodeLinkStates;
    (function(RedisClusterNodeLinkStates2) {
      RedisClusterNodeLinkStates2["CONNECTED"] = "connected";
      RedisClusterNodeLinkStates2["DISCONNECTED"] = "disconnected";
    })(RedisClusterNodeLinkStates = exports.RedisClusterNodeLinkStates || (exports.RedisClusterNodeLinkStates = {}));
    function transformReply(reply) {
      const lines = reply.split("\n");
      lines.pop();
      const mastersMap = /* @__PURE__ */ new Map(), replicasMap = /* @__PURE__ */ new Map();
      for (const line of lines) {
        const [id, address, flags, masterId, pingSent, pongRecv, configEpoch, linkState, ...slots] = line.split(" "), node = __spreadProps(__spreadValues({
          id,
          address
        }, transformNodeAddress(address)), {
          flags: flags.split(","),
          pingSent: Number(pingSent),
          pongRecv: Number(pongRecv),
          configEpoch: Number(configEpoch),
          linkState
        });
        if (masterId === "-") {
          let replicas = replicasMap.get(id);
          if (!replicas) {
            replicas = [];
            replicasMap.set(id, replicas);
          }
          mastersMap.set(id, __spreadProps(__spreadValues({}, node), {
            slots: slots.map((slot) => {
              const [fromString, toString] = slot.split("-", 2), from = Number(fromString);
              return {
                from,
                to: toString ? Number(toString) : from
              };
            }),
            replicas
          }));
        } else {
          const replicas = replicasMap.get(masterId);
          if (!replicas) {
            replicasMap.set(masterId, [node]);
          } else {
            replicas.push(node);
          }
        }
      }
      return [...mastersMap.values()];
    }
    exports.transformReply = transformReply;
    function transformNodeAddress(address) {
      const indexOfColon = address.indexOf(":"), indexOfAt = address.indexOf("@", indexOfColon), host = address.substring(0, indexOfColon);
      if (indexOfAt === -1) {
        return {
          host,
          port: Number(address.substring(indexOfColon + 1)),
          cport: null
        };
      }
      return {
        host: address.substring(0, indexOfColon),
        port: Number(address.substring(indexOfColon + 1, indexOfAt)),
        cport: Number(address.substring(indexOfAt + 1))
      };
    }
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLUSTER_MEET.js
var require_CLUSTER_MEET = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLUSTER_MEET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(ip, port) {
      return ["CLUSTER", "MEET", ip, port.toString()];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLUSTER_RESET.js
var require_CLUSTER_RESET = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLUSTER_RESET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(mode) {
      const args = ["CLUSTER", "RESET"];
      if (mode) {
        args.push(mode);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLUSTER_SETSLOT.js
var require_CLUSTER_SETSLOT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLUSTER_SETSLOT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.ClusterSlotStates = void 0;
    var ClusterSlotStates;
    (function(ClusterSlotStates2) {
      ClusterSlotStates2["IMPORTING"] = "IMPORTING";
      ClusterSlotStates2["MIGRATING"] = "MIGRATING";
      ClusterSlotStates2["STABLE"] = "STABLE";
      ClusterSlotStates2["NODE"] = "NODE";
    })(ClusterSlotStates = exports.ClusterSlotStates || (exports.ClusterSlotStates = {}));
    function transformArguments(slot, state, nodeId) {
      const args = ["CLUSTER", "SETSLOT", slot.toString(), state];
      if (nodeId) {
        args.push(nodeId);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLUSTER_SLOTS.js
var require_CLUSTER_SLOTS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CLUSTER_SLOTS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = void 0;
    function transformArguments() {
      return ["CLUSTER", "SLOTS"];
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return reply.map(([from, to, master, ...replicas]) => {
        return {
          from,
          to,
          master: transformNode(master),
          replicas: replicas.map(transformNode)
        };
      });
    }
    exports.transformReply = transformReply;
    function transformNode([ip, port, id]) {
      return {
        ip,
        port,
        id
      };
    }
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/COMMAND_COUNT.js
var require_COMMAND_COUNT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/COMMAND_COUNT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = void 0;
    exports.IS_READ_ONLY = true;
    function transformArguments() {
      return ["COMMAND", "COUNT"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/COMMAND_GETKEYS.js
var require_COMMAND_GETKEYS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/COMMAND_GETKEYS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = void 0;
    exports.IS_READ_ONLY = true;
    function transformArguments(args) {
      return ["COMMAND", "GETKEYS", ...args];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/COMMAND_INFO.js
var require_COMMAND_INFO = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/COMMAND_INFO.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.IS_READ_ONLY = true;
    function transformArguments(commands) {
      return ["COMMAND", "INFO", ...commands];
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return reply.map((command) => command ? (0, generic_transformers_1.transformCommandReply)(command) : null);
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/COMMAND.js
var require_COMMAND = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/COMMAND.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.IS_READ_ONLY = true;
    function transformArguments() {
      return ["COMMAND"];
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return reply.map(generic_transformers_1.transformCommandReply);
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CONFIG_GET.js
var require_CONFIG_GET = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CONFIG_GET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = void 0;
    function transformArguments(parameter) {
      return ["CONFIG", "GET", parameter];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformTuplesReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CONFIG_RESETSTAT.js
var require_CONFIG_RESETSTAT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CONFIG_RESETSTAT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["CONFIG", "RESETSTAT"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CONFIG_REWRITE.js
var require_CONFIG_REWRITE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CONFIG_REWRITE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["CONFIG", "REWRITE"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CONFIG_SET.js
var require_CONFIG_SET = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/CONFIG_SET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(parameter, value) {
      return ["CONFIG", "SET", parameter, value];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/DBSIZE.js
var require_DBSIZE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/DBSIZE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = void 0;
    exports.IS_READ_ONLY = true;
    function transformArguments() {
      return ["DBSIZE"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/DISCARD.js
var require_DISCARD = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/DISCARD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["DISCARD"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ECHO.js
var require_ECHO = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ECHO.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = void 0;
    exports.IS_READ_ONLY = true;
    function transformArguments(message) {
      return ["ECHO", message];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/FAILOVER.js
var require_FAILOVER = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/FAILOVER.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(options) {
      const args = ["FAILOVER"];
      if (options === null || options === void 0 ? void 0 : options.TO) {
        args.push("TO", options.TO.host, options.TO.port.toString());
        if (options.TO.FORCE) {
          args.push("FORCE");
        }
      }
      if (options === null || options === void 0 ? void 0 : options.ABORT) {
        args.push("ABORT");
      }
      if (options === null || options === void 0 ? void 0 : options.TIMEOUT) {
        args.push("TIMEOUT", options.TIMEOUT.toString());
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/FLUSHALL.js
var require_FLUSHALL = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/FLUSHALL.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.RedisFlushModes = void 0;
    var RedisFlushModes;
    (function(RedisFlushModes2) {
      RedisFlushModes2["ASYNC"] = "ASYNC";
      RedisFlushModes2["SYNC"] = "SYNC";
    })(RedisFlushModes = exports.RedisFlushModes || (exports.RedisFlushModes = {}));
    function transformArguments(mode) {
      const args = ["FLUSHALL"];
      if (mode) {
        args.push(mode);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/FLUSHDB.js
var require_FLUSHDB = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/FLUSHDB.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(mode) {
      const args = ["FLUSHDB"];
      if (mode) {
        args.push(mode);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HELLO.js
var require_HELLO = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/HELLO.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = void 0;
    function transformArguments(options) {
      const args = ["HELLO"];
      if (options) {
        args.push(options.protover.toString());
        if (options.auth) {
          args.push("AUTH", options.auth.username, options.auth.password);
        }
        if (options.clientName) {
          args.push("SETNAME", options.clientName);
        }
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return {
        server: reply[1],
        version: reply[3],
        proto: reply[5],
        id: reply[7],
        mode: reply[9],
        role: reply[11],
        modules: reply[13]
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/INFO.js
var require_INFO = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/INFO.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = void 0;
    exports.IS_READ_ONLY = true;
    function transformArguments(section) {
      const args = ["INFO"];
      if (section) {
        args.push(section);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/KEYS.js
var require_KEYS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/KEYS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(pattern) {
      return ["KEYS", pattern];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LASTSAVE.js
var require_LASTSAVE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LASTSAVE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
    exports.IS_READ_ONLY = true;
    function transformArguments() {
      return ["LASTSAVE"];
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return new Date(reply);
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LOLWUT.js
var require_LOLWUT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/LOLWUT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = void 0;
    exports.IS_READ_ONLY = true;
    function transformArguments(version, ...optionalArguments) {
      const args = ["LOLWUT"];
      if (version) {
        args.push("VERSION", version.toString(), ...optionalArguments.map(String));
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MEMORY_DOCTOR.js
var require_MEMORY_DOCTOR = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MEMORY_DOCTOR.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["MEMORY", "DOCTOR"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MEMORY_MALLOC-STATS.js
var require_MEMORY_MALLOC_STATS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MEMORY_MALLOC-STATS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["MEMORY", "MALLOC-STATS"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MEMORY_PURGE.js
var require_MEMORY_PURGE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MEMORY_PURGE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["MEMORY", "PURGE"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MEMORY_STATS.js
var require_MEMORY_STATS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MEMORY_STATS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = void 0;
    function transformArguments() {
      return ["MEMORY", "STATS"];
    }
    exports.transformArguments = transformArguments;
    var FIELDS_MAPPING = {
      "peak.allocated": "peakAllocated",
      "total.allocated": "totalAllocated",
      "startup.allocated": "startupAllocated",
      "replication.backlog": "replicationBacklog",
      "clients.slaves": "clientsReplicas",
      "clients.normal": "clientsNormal",
      "aof.buffer": "aofBuffer",
      "lua.caches": "luaCaches",
      "overhead.total": "overheadTotal",
      "keys.count": "keysCount",
      "keys.bytes-per-key": "keysBytesPerKey",
      "dataset.bytes": "datasetBytes",
      "dataset.percentage": "datasetPercentage",
      "peak.percentage": "peakPercentage",
      "allocator.allocated": "allocatorAllocated",
      "allocator.active": "allocatorActive",
      "allocator.resident": "allocatorResident",
      "allocator-fragmentation.ratio": "allocatorFragmentationRatio",
      "allocator-fragmentation.bytes": "allocatorFragmentationBytes",
      "allocator-rss.ratio": "allocatorRssRatio",
      "allocator-rss.bytes": "allocatorRssBytes",
      "rss-overhead.ratio": "rssOverheadRatio",
      "rss-overhead.bytes": "rssOverheadBytes",
      "fragmentation": "fragmentation",
      "fragmentation.bytes": "fragmentationBytes"
    };
    var DB_FIELDS_MAPPING = {
      "overhead.hashtable.main": "overheadHashtableMain",
      "overhead.hashtable.expires": "overheadHashtableExpires"
    };
    function transformReply(rawReply) {
      const reply = {
        db: {}
      };
      for (let i2 = 0; i2 < rawReply.length; i2 += 2) {
        const key2 = rawReply[i2];
        if (key2.startsWith("db.")) {
          const dbTuples = rawReply[i2 + 1], db = {};
          for (let j = 0; j < dbTuples.length; j += 2) {
            db[DB_FIELDS_MAPPING[dbTuples[j]]] = dbTuples[j + 1];
          }
          reply.db[key2.substring(3)] = db;
          continue;
        }
        reply[FIELDS_MAPPING[key2]] = Number(rawReply[i2 + 1]);
      }
      return reply;
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MEMORY_USAGE.js
var require_MEMORY_USAGE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MEMORY_USAGE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, options) {
      const args = ["MEMORY", "USAGE", key2];
      if (options === null || options === void 0 ? void 0 : options.SAMPLES) {
        args.push("SAMPLES", options.SAMPLES.toString());
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MODULE_LIST.js
var require_MODULE_LIST = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MODULE_LIST.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["MODULE", "LIST"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MODULE_LOAD.js
var require_MODULE_LOAD = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MODULE_LOAD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(path, moduleArgs) {
      const args = ["MODULE", "LOAD", path];
      if (moduleArgs) {
        args.push(...moduleArgs);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MODULE_UNLOAD.js
var require_MODULE_UNLOAD = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MODULE_UNLOAD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(name) {
      return ["MODULE", "UNLOAD", name];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MOVE.js
var require_MOVE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/MOVE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = void 0;
    function transformArguments(key2, db) {
      return ["MOVE", key2, db.toString()];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PING.js
var require_PING = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PING.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["PING"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PUBSUB_CHANNELS.js
var require_PUBSUB_CHANNELS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PUBSUB_CHANNELS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = void 0;
    exports.IS_READ_ONLY = true;
    function transformArguments(pattern) {
      const args = ["PUBSUB", "CHANNELS"];
      if (pattern) {
        args.push(pattern);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PUBSUB_NUMPAT.js
var require_PUBSUB_NUMPAT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PUBSUB_NUMPAT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = void 0;
    exports.IS_READ_ONLY = true;
    function transformArguments() {
      return ["PUBSUB", "NUMPAT"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PUBSUB_NUMSUB.js
var require_PUBSUB_NUMSUB = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/PUBSUB_NUMSUB.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.IS_READ_ONLY = true;
    function transformArguments(channels) {
      const args = ["PUBSUB", "NUMSUB"];
      if (channels) {
        (0, generic_transformers_1.pushVerdictArguments)(args, channels);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    function transformReply(rawReply) {
      const transformedReply = /* @__PURE__ */ Object.create(null);
      for (let i2 = 0; i2 < rawReply.length; i2 += 2) {
        transformedReply[rawReply[i2]] = rawReply[i2 + 1];
      }
      return transformedReply;
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/RANDOMKEY.js
var require_RANDOMKEY = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/RANDOMKEY.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = void 0;
    exports.IS_READ_ONLY = true;
    function transformArguments() {
      return ["RANDOMKEY"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/READONLY.js
var require_READONLY = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/READONLY.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["READONLY"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/READWRITE.js
var require_READWRITE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/READWRITE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["READWRITE"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/REPLICAOF.js
var require_REPLICAOF = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/REPLICAOF.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(host, port) {
      return ["REPLICAOF", host, port.toString()];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/RESTORE-ASKING.js
var require_RESTORE_ASKING = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/RESTORE-ASKING.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["RESTORE-ASKING"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ROLE.js
var require_ROLE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/ROLE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
    exports.IS_READ_ONLY = true;
    function transformArguments() {
      return ["ROLE"];
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      switch (reply[0]) {
        case "master":
          return {
            role: "master",
            replicationOffest: reply[1],
            replicas: reply[2].map(([ip, port, replicationOffest]) => ({
              ip,
              port: Number(port),
              replicationOffest: Number(replicationOffest)
            }))
          };
        case "slave":
          return {
            role: "slave",
            master: {
              ip: reply[1],
              port: reply[2]
            },
            state: reply[3],
            dataReceived: reply[4]
          };
        case "sentinel":
          return {
            role: "sentinel",
            masterNames: reply[1]
          };
      }
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SAVE.js
var require_SAVE = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SAVE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["SAVE"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SCAN.js
var require_SCAN = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SCAN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.IS_READ_ONLY = true;
    function transformArguments(cursor, options) {
      const args = (0, generic_transformers_1.pushScanArguments)(["SCAN"], cursor, options);
      if (options === null || options === void 0 ? void 0 : options.TYPE) {
        args.push("TYPE", options.TYPE);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    function transformReply([cursor, keys]) {
      return {
        cursor: Number(cursor),
        keys
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SCRIPT_DEBUG.js
var require_SCRIPT_DEBUG = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SCRIPT_DEBUG.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(mode) {
      return ["SCRIPT", "DEBUG", mode];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SCRIPT_EXISTS.js
var require_SCRIPT_EXISTS = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SCRIPT_EXISTS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = void 0;
    var generic_transformers_1 = require_generic_transformers();
    function transformArguments(sha1) {
      return (0, generic_transformers_1.pushVerdictArguments)(["SCRIPT", "EXISTS"], sha1);
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_2 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_2.transformBooleanArrayReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SCRIPT_FLUSH.js
var require_SCRIPT_FLUSH = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SCRIPT_FLUSH.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(mode) {
      const args = ["SCRIPT", "FLUSH"];
      if (mode) {
        args.push(mode);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SCRIPT_KILL.js
var require_SCRIPT_KILL = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SCRIPT_KILL.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["SCRIPT", "KILL"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SCRIPT_LOAD.js
var require_SCRIPT_LOAD = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SCRIPT_LOAD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(script) {
      return ["SCRIPT", "LOAD", script];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SHUTDOWN.js
var require_SHUTDOWN = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SHUTDOWN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(mode) {
      const args = ["SHUTDOWN"];
      if (mode) {
        args.push(mode);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SWAPDB.js
var require_SWAPDB = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/SWAPDB.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(index1, index2) {
      return ["SWAPDB", index1.toString(), index2.toString()];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/TIME.js
var require_TIME = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/TIME.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = void 0;
    function transformArguments() {
      return ["TIME"];
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      const seconds = Number(reply[0]), microseconds = Number(reply[1]), d = new Date(seconds + Math.round(microseconds / 1e3));
      d.microseconds = microseconds;
      return d;
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/UNWATCH.js
var require_UNWATCH = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/UNWATCH.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["UNWATCH"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/WAIT.js
var require_WAIT = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commands/WAIT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(numberOfReplicas, timeout) {
      return ["WAIT", numberOfReplicas.toString(), timeout.toString()];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/client/commands.js
var require_commands2 = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/client/commands.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var commands_1 = require_commands();
    var ACL_CAT = require_ACL_CAT();
    var ACL_DELUSER = require_ACL_DELUSER();
    var ACL_GENPASS = require_ACL_GENPASS();
    var ACL_GETUSER = require_ACL_GETUSER();
    var ACL_LIST = require_ACL_LIST();
    var ACL_LOAD = require_ACL_LOAD();
    var ACL_LOG_RESET = require_ACL_LOG_RESET();
    var ACL_LOG = require_ACL_LOG();
    var ACL_SAVE = require_ACL_SAVE();
    var ACL_SETUSER = require_ACL_SETUSER();
    var ACL_USERS = require_ACL_USERS();
    var ACL_WHOAMI = require_ACL_WHOAMI();
    var ASKING = require_ASKING();
    var AUTH = require_AUTH();
    var BGREWRITEAOF = require_BGREWRITEAOF();
    var BGSAVE = require_BGSAVE();
    var CLIENT_CACHING = require_CLIENT_CACHING();
    var CLIENT_GETNAME = require_CLIENT_GETNAME();
    var CLIENT_GETREDIR = require_CLIENT_GETREDIR();
    var CLIENT_ID = require_CLIENT_ID();
    var CLIENT_KILL = require_CLIENT_KILL();
    var CLIENT_SETNAME = require_CLIENT_SETNAME();
    var CLIENT_INFO = require_CLIENT_INFO();
    var CLUSTER_ADDSLOTS = require_CLUSTER_ADDSLOTS();
    var CLUSTER_FLUSHSLOTS = require_CLUSTER_FLUSHSLOTS();
    var CLUSTER_INFO = require_CLUSTER_INFO();
    var CLUSTER_NODES = require_CLUSTER_NODES();
    var CLUSTER_MEET = require_CLUSTER_MEET();
    var CLUSTER_RESET = require_CLUSTER_RESET();
    var CLUSTER_SETSLOT = require_CLUSTER_SETSLOT();
    var CLUSTER_SLOTS = require_CLUSTER_SLOTS();
    var COMMAND_COUNT = require_COMMAND_COUNT();
    var COMMAND_GETKEYS = require_COMMAND_GETKEYS();
    var COMMAND_INFO = require_COMMAND_INFO();
    var COMMAND = require_COMMAND();
    var CONFIG_GET = require_CONFIG_GET();
    var CONFIG_RESETASTAT = require_CONFIG_RESETSTAT();
    var CONFIG_REWRITE = require_CONFIG_REWRITE();
    var CONFIG_SET = require_CONFIG_SET();
    var DBSIZE = require_DBSIZE();
    var DISCARD = require_DISCARD();
    var ECHO = require_ECHO();
    var FAILOVER = require_FAILOVER();
    var FLUSHALL = require_FLUSHALL();
    var FLUSHDB = require_FLUSHDB();
    var HELLO = require_HELLO();
    var INFO = require_INFO();
    var KEYS = require_KEYS();
    var LASTSAVE = require_LASTSAVE();
    var LOLWUT = require_LOLWUT();
    var MEMOERY_DOCTOR = require_MEMORY_DOCTOR();
    var MEMORY_MALLOC_STATS = require_MEMORY_MALLOC_STATS();
    var MEMORY_PURGE = require_MEMORY_PURGE();
    var MEMORY_STATS = require_MEMORY_STATS();
    var MEMORY_USAGE = require_MEMORY_USAGE();
    var MODULE_LIST = require_MODULE_LIST();
    var MODULE_LOAD = require_MODULE_LOAD();
    var MODULE_UNLOAD = require_MODULE_UNLOAD();
    var MOVE = require_MOVE();
    var PING = require_PING();
    var PUBSUB_CHANNELS = require_PUBSUB_CHANNELS();
    var PUBSUB_NUMPAT = require_PUBSUB_NUMPAT();
    var PUBSUB_NUMSUB = require_PUBSUB_NUMSUB();
    var RANDOMKEY = require_RANDOMKEY();
    var READONLY = require_READONLY();
    var READWRITE = require_READWRITE();
    var REPLICAOF = require_REPLICAOF();
    var RESTORE_ASKING = require_RESTORE_ASKING();
    var ROLE = require_ROLE();
    var SAVE = require_SAVE();
    var SCAN = require_SCAN();
    var SCRIPT_DEBUG = require_SCRIPT_DEBUG();
    var SCRIPT_EXISTS = require_SCRIPT_EXISTS();
    var SCRIPT_FLUSH = require_SCRIPT_FLUSH();
    var SCRIPT_KILL = require_SCRIPT_KILL();
    var SCRIPT_LOAD = require_SCRIPT_LOAD();
    var SHUTDOWN = require_SHUTDOWN();
    var SWAPDB = require_SWAPDB();
    var TIME = require_TIME();
    var UNWATCH = require_UNWATCH();
    var WAIT = require_WAIT();
    exports.default = __spreadProps(__spreadValues({}, commands_1.default), {
      ACL_CAT,
      aclCat: ACL_CAT,
      ACL_DELUSER,
      aclDelUser: ACL_DELUSER,
      ACL_GENPASS,
      aclGenPass: ACL_GENPASS,
      ACL_GETUSER,
      aclGetUser: ACL_GETUSER,
      ACL_LIST,
      aclList: ACL_LIST,
      ACL_LOAD,
      aclLoad: ACL_LOAD,
      ACL_LOG_RESET,
      aclLogReset: ACL_LOG_RESET,
      ACL_LOG,
      aclLog: ACL_LOG,
      ACL_SAVE,
      aclSave: ACL_SAVE,
      ACL_SETUSER,
      aclSetUser: ACL_SETUSER,
      ACL_USERS,
      aclUsers: ACL_USERS,
      ACL_WHOAMI,
      aclWhoAmI: ACL_WHOAMI,
      ASKING,
      asking: ASKING,
      AUTH,
      auth: AUTH,
      BGREWRITEAOF,
      bgRewriteAof: BGREWRITEAOF,
      BGSAVE,
      bgSave: BGSAVE,
      CLIENT_CACHING,
      clientCaching: CLIENT_CACHING,
      CLIENT_GETNAME,
      clientGetName: CLIENT_GETNAME,
      CLIENT_GETREDIR,
      clientGetRedir: CLIENT_GETREDIR,
      CLIENT_ID,
      clientId: CLIENT_ID,
      CLIENT_KILL,
      clientKill: CLIENT_KILL,
      CLIENT_SETNAME,
      clientSetName: CLIENT_SETNAME,
      CLIENT_INFO,
      clientInfo: CLIENT_INFO,
      CLUSTER_ADDSLOTS,
      clusterAddSlots: CLUSTER_ADDSLOTS,
      CLUSTER_FLUSHSLOTS,
      clusterFlushSlots: CLUSTER_FLUSHSLOTS,
      CLUSTER_INFO,
      clusterInfo: CLUSTER_INFO,
      CLUSTER_NODES,
      clusterNodes: CLUSTER_NODES,
      CLUSTER_MEET,
      clusterMeet: CLUSTER_MEET,
      CLUSTER_RESET,
      clusterReset: CLUSTER_RESET,
      CLUSTER_SETSLOT,
      clusterSetSlot: CLUSTER_SETSLOT,
      CLUSTER_SLOTS,
      clusterSlots: CLUSTER_SLOTS,
      COMMAND_COUNT,
      commandCount: COMMAND_COUNT,
      COMMAND_GETKEYS,
      commandGetKeys: COMMAND_GETKEYS,
      COMMAND_INFO,
      commandInfo: COMMAND_INFO,
      COMMAND,
      command: COMMAND,
      CONFIG_GET,
      configGet: CONFIG_GET,
      CONFIG_RESETASTAT,
      configResetStat: CONFIG_RESETASTAT,
      CONFIG_REWRITE,
      configRewrite: CONFIG_REWRITE,
      CONFIG_SET,
      configSet: CONFIG_SET,
      DBSIZE,
      dbSize: DBSIZE,
      DISCARD,
      discard: DISCARD,
      ECHO,
      echo: ECHO,
      FAILOVER,
      failover: FAILOVER,
      FLUSHALL,
      flushAll: FLUSHALL,
      FLUSHDB,
      flushDb: FLUSHDB,
      HELLO,
      hello: HELLO,
      INFO,
      info: INFO,
      KEYS,
      keys: KEYS,
      LASTSAVE,
      lastSave: LASTSAVE,
      LOLWUT,
      lolwut: LOLWUT,
      MEMOERY_DOCTOR,
      memoryDoctor: MEMOERY_DOCTOR,
      "MEMORY_MALLOC-STATS": MEMORY_MALLOC_STATS,
      memoryMallocStats: MEMORY_MALLOC_STATS,
      MEMORY_PURGE,
      memoryPurge: MEMORY_PURGE,
      MEMORY_STATS,
      memoryStats: MEMORY_STATS,
      MEMORY_USAGE,
      memoryUsage: MEMORY_USAGE,
      MODULE_LIST,
      moduleList: MODULE_LIST,
      MODULE_LOAD,
      moduleLoad: MODULE_LOAD,
      MODULE_UNLOAD,
      moduleUnload: MODULE_UNLOAD,
      MOVE,
      move: MOVE,
      PING,
      ping: PING,
      PUBSUB_CHANNELS,
      pubSubChannels: PUBSUB_CHANNELS,
      PUBSUB_NUMPAT,
      pubSubNumPat: PUBSUB_NUMPAT,
      PUBSUB_NUMSUB,
      pubSubNumSub: PUBSUB_NUMSUB,
      RANDOMKEY,
      randomKey: RANDOMKEY,
      READONLY,
      readonly: READONLY,
      READWRITE,
      readwrite: READWRITE,
      REPLICAOF,
      replicaOf: REPLICAOF,
      "RESTORE-ASKING": RESTORE_ASKING,
      restoreAsking: RESTORE_ASKING,
      ROLE,
      role: ROLE,
      SAVE,
      save: SAVE,
      SCAN,
      scan: SCAN,
      SCRIPT_DEBUG,
      scriptDebug: SCRIPT_DEBUG,
      SCRIPT_EXISTS,
      scriptExists: SCRIPT_EXISTS,
      SCRIPT_FLUSH,
      scriptFlush: SCRIPT_FLUSH,
      SCRIPT_KILL,
      scriptKill: SCRIPT_KILL,
      SCRIPT_LOAD,
      scriptLoad: SCRIPT_LOAD,
      SHUTDOWN,
      shutdown: SHUTDOWN,
      SWAPDB,
      swapDb: SWAPDB,
      TIME,
      time: TIME,
      UNWATCH,
      unwatch: UNWATCH,
      WAIT,
      wait: WAIT
    });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/command-options.js
var require_command_options = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/command-options.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isCommandOptions = exports.commandOptions = void 0;
    var symbol = Symbol("Command Options");
    function commandOptions(options) {
      options[symbol] = true;
      return options;
    }
    exports.commandOptions = commandOptions;
    function isCommandOptions(options) {
      return (options === null || options === void 0 ? void 0 : options[symbol]) === true;
    }
    exports.isCommandOptions = isCommandOptions;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commander.js
var require_commander = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/commander.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformCommandReply = exports.encodeCommand = exports.transformCommandArguments = exports.extendWithModulesAndScripts = exports.extendWithCommands = void 0;
    var command_options_1 = require_command_options();
    function extendWithCommands({ BaseClass, commands, executor }) {
      for (const [name, command] of Object.entries(commands)) {
        BaseClass.prototype[name] = function(...args) {
          return executor.call(this, command, args);
        };
      }
    }
    exports.extendWithCommands = extendWithCommands;
    function extendWithModulesAndScripts(config) {
      let Commander;
      if (config.modules) {
        Commander = class extends config.BaseClass {
          constructor(...args) {
            super(...args);
            for (const module3 of Object.keys(config.modules)) {
              this[module3] = new this[module3](this);
            }
          }
        };
        for (const [moduleName, module3] of Object.entries(config.modules)) {
          Commander.prototype[moduleName] = class {
            constructor(self2) {
              Object.defineProperty(this, "self", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
              });
              this.self = self2;
            }
          };
          for (const [commandName, command] of Object.entries(module3)) {
            Commander.prototype[moduleName].prototype[commandName] = function(...args) {
              return config.modulesCommandsExecutor.call(this.self, command, args);
            };
          }
        }
      }
      if (config.scripts) {
        Commander !== null && Commander !== void 0 ? Commander : Commander = class extends config.BaseClass {
        };
        for (const [name, script] of Object.entries(config.scripts)) {
          Commander.prototype[name] = function(...args) {
            return config.scriptsExecutor.call(this, script, args);
          };
        }
      }
      return Commander !== null && Commander !== void 0 ? Commander : config.BaseClass;
    }
    exports.extendWithModulesAndScripts = extendWithModulesAndScripts;
    function transformCommandArguments(command, args) {
      let options;
      if ((0, command_options_1.isCommandOptions)(args[0])) {
        options = args[0];
        args = args.slice(1);
      }
      return {
        args: command.transformArguments(...args),
        options
      };
    }
    exports.transformCommandArguments = transformCommandArguments;
    var DELIMITER = "\r\n";
    function* encodeCommand(args) {
      var _a4, _b;
      let strings = `*${args.length}${DELIMITER}`, stringsLength = 0;
      for (const arg of args) {
        if (Buffer.isBuffer(arg)) {
          yield `${strings}$${arg.length}${DELIMITER}`;
          strings = "";
          stringsLength = 0;
          yield arg;
        } else {
          const string = (_b = (_a4 = arg === null || arg === void 0 ? void 0 : arg.toString) === null || _a4 === void 0 ? void 0 : _a4.call(arg)) !== null && _b !== void 0 ? _b : "", byteLength = Buffer.byteLength(string);
          strings += `$${byteLength}${DELIMITER}`;
          const totalLength = stringsLength + byteLength;
          if (totalLength > 1024) {
            yield strings;
            strings = string;
            stringsLength = byteLength;
          } else {
            strings += string;
            stringsLength = totalLength;
          }
        }
        strings += DELIMITER;
      }
      yield strings;
    }
    exports.encodeCommand = encodeCommand;
    function transformCommandReply(command, rawReply, preserved) {
      if (!command.transformReply) {
        return rawReply;
      }
      return command.transformReply(rawReply, preserved);
    }
    exports.transformCommandReply = transformCommandReply;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/errors.js
var require_errors = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReconnectStrategyError = exports.RootNodesUnavailableError = exports.AuthError = exports.SocketClosedUnexpectedlyError = exports.DisconnectsClientError = exports.ClientClosedError = exports.ConnectionTimeoutError = exports.WatchError = exports.AbortError = void 0;
    var AbortError2 = class extends Error {
      constructor() {
        super("The command was aborted");
      }
    };
    exports.AbortError = AbortError2;
    var WatchError = class extends Error {
      constructor() {
        super("One (or more) of the watched keys has been changed");
      }
    };
    exports.WatchError = WatchError;
    var ConnectionTimeoutError = class extends Error {
      constructor() {
        super("Connection timeout");
      }
    };
    exports.ConnectionTimeoutError = ConnectionTimeoutError;
    var ClientClosedError = class extends Error {
      constructor() {
        super("The client is closed");
      }
    };
    exports.ClientClosedError = ClientClosedError;
    var DisconnectsClientError = class extends Error {
      constructor() {
        super("Disconnects client");
      }
    };
    exports.DisconnectsClientError = DisconnectsClientError;
    var SocketClosedUnexpectedlyError = class extends Error {
      constructor() {
        super("Socket closed unexpectedly");
      }
    };
    exports.SocketClosedUnexpectedlyError = SocketClosedUnexpectedlyError;
    var AuthError = class extends Error {
      constructor(message) {
        super(message);
      }
    };
    exports.AuthError = AuthError;
    var RootNodesUnavailableError = class extends Error {
      constructor() {
        super("All the root nodes are unavailable");
      }
    };
    exports.RootNodesUnavailableError = RootNodesUnavailableError;
    var ReconnectStrategyError = class extends Error {
      constructor(originalError, socketError) {
        super(originalError.message);
        Object.defineProperty(this, "originalError", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "socketError", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.originalError = originalError;
        this.socketError = socketError;
      }
    };
    exports.ReconnectStrategyError = ReconnectStrategyError;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.promiseTimeout = void 0;
    function promiseTimeout(ms) {
      return new Promise((resolve2) => setTimeout(resolve2, ms));
    }
    exports.promiseTimeout = promiseTimeout;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/client/socket.js
var require_socket = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/client/socket.js"(exports) {
    "use strict";
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f3) {
      if (kind === "m")
        throw new TypeError("Private method is not writable");
      if (kind === "a" && !f3)
        throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
        throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f3.call(receiver, value) : f3 ? f3.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f3) {
      if (kind === "a" && !f3)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f3 : kind === "a" ? f3.call(receiver) : f3 ? f3.value : state.get(receiver);
    };
    var _RedisSocket_instances;
    var _a4;
    var _RedisSocket_initiateOptions;
    var _RedisSocket_defaultReconnectStrategy;
    var _RedisSocket_isTlsSocket;
    var _RedisSocket_initiator;
    var _RedisSocket_options;
    var _RedisSocket_socket;
    var _RedisSocket_isOpen;
    var _RedisSocket_isReady;
    var _RedisSocket_writableNeedDrain;
    var _RedisSocket_connect;
    var _RedisSocket_retryConnection;
    var _RedisSocket_createSocket;
    var _RedisSocket_createNetSocket;
    var _RedisSocket_createTlsSocket;
    var _RedisSocket_onSocketError;
    var _RedisSocket_isCorked;
    Object.defineProperty(exports, "__esModule", { value: true });
    var events_1 = require("events");
    var net = require("net");
    var tls = require("tls");
    var commander_1 = require_commander();
    var errors_1 = require_errors();
    var utils_1 = require_utils();
    var RedisSocket = class extends events_1.EventEmitter {
      constructor(initiator, options) {
        super();
        _RedisSocket_instances.add(this);
        _RedisSocket_initiator.set(this, void 0);
        _RedisSocket_options.set(this, void 0);
        _RedisSocket_socket.set(this, void 0);
        _RedisSocket_isOpen.set(this, false);
        _RedisSocket_isReady.set(this, false);
        _RedisSocket_writableNeedDrain.set(this, false);
        _RedisSocket_isCorked.set(this, false);
        __classPrivateFieldSet(this, _RedisSocket_initiator, initiator, "f");
        __classPrivateFieldSet(this, _RedisSocket_options, __classPrivateFieldGet(RedisSocket, _a4, "m", _RedisSocket_initiateOptions).call(RedisSocket, options), "f");
      }
      get isOpen() {
        return __classPrivateFieldGet(this, _RedisSocket_isOpen, "f");
      }
      get isReady() {
        return __classPrivateFieldGet(this, _RedisSocket_isReady, "f");
      }
      get writableNeedDrain() {
        return __classPrivateFieldGet(this, _RedisSocket_writableNeedDrain, "f");
      }
      async connect() {
        if (__classPrivateFieldGet(this, _RedisSocket_isOpen, "f")) {
          throw new Error("Socket already opened");
        }
        return __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_connect).call(this);
      }
      writeCommand(args) {
        if (!__classPrivateFieldGet(this, _RedisSocket_socket, "f")) {
          throw new errors_1.ClientClosedError();
        }
        for (const toWrite of (0, commander_1.encodeCommand)(args)) {
          __classPrivateFieldSet(this, _RedisSocket_writableNeedDrain, !__classPrivateFieldGet(this, _RedisSocket_socket, "f").write(toWrite), "f");
        }
      }
      disconnect() {
        if (!__classPrivateFieldGet(this, _RedisSocket_socket, "f")) {
          throw new errors_1.ClientClosedError();
        } else {
          __classPrivateFieldSet(this, _RedisSocket_isOpen, __classPrivateFieldSet(this, _RedisSocket_isReady, false, "f"), "f");
        }
        __classPrivateFieldGet(this, _RedisSocket_socket, "f").destroy();
        __classPrivateFieldSet(this, _RedisSocket_socket, void 0, "f");
        this.emit("end");
      }
      async quit(fn) {
        if (!__classPrivateFieldGet(this, _RedisSocket_isOpen, "f")) {
          throw new errors_1.ClientClosedError();
        }
        __classPrivateFieldSet(this, _RedisSocket_isOpen, false, "f");
        await fn();
        this.disconnect();
      }
      cork() {
        if (!__classPrivateFieldGet(this, _RedisSocket_socket, "f") || __classPrivateFieldGet(this, _RedisSocket_isCorked, "f")) {
          return;
        }
        __classPrivateFieldGet(this, _RedisSocket_socket, "f").cork();
        __classPrivateFieldSet(this, _RedisSocket_isCorked, true, "f");
        queueMicrotask(() => {
          var _b;
          (_b = __classPrivateFieldGet(this, _RedisSocket_socket, "f")) === null || _b === void 0 ? void 0 : _b.uncork();
          __classPrivateFieldSet(this, _RedisSocket_isCorked, false, "f");
        });
      }
    };
    exports.default = RedisSocket;
    _a4 = RedisSocket, _RedisSocket_initiator = /* @__PURE__ */ new WeakMap(), _RedisSocket_options = /* @__PURE__ */ new WeakMap(), _RedisSocket_socket = /* @__PURE__ */ new WeakMap(), _RedisSocket_isOpen = /* @__PURE__ */ new WeakMap(), _RedisSocket_isReady = /* @__PURE__ */ new WeakMap(), _RedisSocket_writableNeedDrain = /* @__PURE__ */ new WeakMap(), _RedisSocket_isCorked = /* @__PURE__ */ new WeakMap(), _RedisSocket_instances = /* @__PURE__ */ new WeakSet(), _RedisSocket_initiateOptions = function _RedisSocket_initiateOptions2(options) {
      var _b, _c, _d2, _e, _f;
      var _g, _h;
      options !== null && options !== void 0 ? options : options = {};
      if (!options.path) {
        (_b = (_g = options).port) !== null && _b !== void 0 ? _b : _g.port = 6379;
        (_c = (_h = options).host) !== null && _c !== void 0 ? _c : _h.host = "localhost";
      }
      (_d2 = options.connectTimeout) !== null && _d2 !== void 0 ? _d2 : options.connectTimeout = 5e3;
      (_e = options.keepAlive) !== null && _e !== void 0 ? _e : options.keepAlive = 5e3;
      (_f = options.noDelay) !== null && _f !== void 0 ? _f : options.noDelay = true;
      return options;
    }, _RedisSocket_defaultReconnectStrategy = function _RedisSocket_defaultReconnectStrategy2(retries) {
      return Math.min(retries * 50, 500);
    }, _RedisSocket_isTlsSocket = function _RedisSocket_isTlsSocket2(options) {
      return options.tls === true;
    }, _RedisSocket_connect = async function _RedisSocket_connect2(hadError) {
      try {
        __classPrivateFieldSet(this, _RedisSocket_isOpen, true, "f");
        __classPrivateFieldSet(this, _RedisSocket_socket, await __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_retryConnection).call(this, 0, hadError), "f");
        __classPrivateFieldSet(this, _RedisSocket_writableNeedDrain, false, "f");
      } catch (err) {
        __classPrivateFieldSet(this, _RedisSocket_isOpen, false, "f");
        this.emit("error", err);
        this.emit("end");
        throw err;
      }
      if (!__classPrivateFieldGet(this, _RedisSocket_isOpen, "f")) {
        this.disconnect();
        return;
      }
      this.emit("connect");
      if (__classPrivateFieldGet(this, _RedisSocket_initiator, "f")) {
        try {
          await __classPrivateFieldGet(this, _RedisSocket_initiator, "f").call(this);
        } catch (err) {
          __classPrivateFieldGet(this, _RedisSocket_socket, "f").destroy();
          __classPrivateFieldSet(this, _RedisSocket_socket, void 0, "f");
          if (err instanceof errors_1.AuthError) {
            __classPrivateFieldSet(this, _RedisSocket_isOpen, false, "f");
          }
          throw err;
        }
        if (!__classPrivateFieldGet(this, _RedisSocket_isOpen, "f"))
          return;
      }
      __classPrivateFieldSet(this, _RedisSocket_isReady, true, "f");
      this.emit("ready");
    }, _RedisSocket_retryConnection = async function _RedisSocket_retryConnection2(retries, hadError) {
      var _b, _c;
      if (retries > 0 || hadError) {
        this.emit("reconnecting");
      }
      try {
        return await __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_createSocket).call(this);
      } catch (err) {
        if (!__classPrivateFieldGet(this, _RedisSocket_isOpen, "f")) {
          throw err;
        }
        const retryIn = ((_c = (_b = __classPrivateFieldGet(this, _RedisSocket_options, "f")) === null || _b === void 0 ? void 0 : _b.reconnectStrategy) !== null && _c !== void 0 ? _c : __classPrivateFieldGet(RedisSocket, _a4, "m", _RedisSocket_defaultReconnectStrategy))(retries);
        if (retryIn instanceof Error) {
          throw new errors_1.ReconnectStrategyError(retryIn, err);
        }
        this.emit("error", err);
        await (0, utils_1.promiseTimeout)(retryIn);
        return __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_retryConnection2).call(this, retries + 1);
      }
    }, _RedisSocket_createSocket = function _RedisSocket_createSocket2() {
      return new Promise((resolve2, reject) => {
        const { connectEvent, socket } = __classPrivateFieldGet(RedisSocket, _a4, "m", _RedisSocket_isTlsSocket).call(RedisSocket, __classPrivateFieldGet(this, _RedisSocket_options, "f")) ? __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_createTlsSocket).call(this) : __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_createNetSocket).call(this);
        if (__classPrivateFieldGet(this, _RedisSocket_options, "f").connectTimeout) {
          socket.setTimeout(__classPrivateFieldGet(this, _RedisSocket_options, "f").connectTimeout, () => socket.destroy(new errors_1.ConnectionTimeoutError()));
        }
        socket.setNoDelay(__classPrivateFieldGet(this, _RedisSocket_options, "f").noDelay).setKeepAlive(__classPrivateFieldGet(this, _RedisSocket_options, "f").keepAlive !== false, __classPrivateFieldGet(this, _RedisSocket_options, "f").keepAlive || 0).once("error", reject).once(connectEvent, () => {
          socket.setTimeout(0).off("error", reject).once("error", (err) => __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_onSocketError).call(this, err)).once("close", (hadError) => {
            if (!hadError && __classPrivateFieldGet(this, _RedisSocket_isOpen, "f") && __classPrivateFieldGet(this, _RedisSocket_socket, "f") === socket) {
              __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_onSocketError).call(this, new errors_1.SocketClosedUnexpectedlyError());
            }
          }).on("drain", () => {
            __classPrivateFieldSet(this, _RedisSocket_writableNeedDrain, false, "f");
            this.emit("drain");
          }).on("data", (data) => this.emit("data", data));
          resolve2(socket);
        });
      });
    }, _RedisSocket_createNetSocket = function _RedisSocket_createNetSocket2() {
      return {
        connectEvent: "connect",
        socket: net.connect(__classPrivateFieldGet(this, _RedisSocket_options, "f"))
      };
    }, _RedisSocket_createTlsSocket = function _RedisSocket_createTlsSocket2() {
      return {
        connectEvent: "secureConnect",
        socket: tls.connect(__classPrivateFieldGet(this, _RedisSocket_options, "f"))
      };
    }, _RedisSocket_onSocketError = function _RedisSocket_onSocketError2(err) {
      __classPrivateFieldSet(this, _RedisSocket_isReady, false, "f");
      this.emit("error", err);
      __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_connect).call(this, true).catch(() => {
      });
    };
  }
});

// node_modules/.pnpm/yallist@4.0.0/node_modules/yallist/iterator.js
var require_iterator = __commonJS({
  "node_modules/.pnpm/yallist@4.0.0/node_modules/yallist/iterator.js"(exports, module2) {
    "use strict";
    module2.exports = function(Yallist) {
      Yallist.prototype[Symbol.iterator] = function* () {
        for (let walker = this.head; walker; walker = walker.next) {
          yield walker.value;
        }
      };
    };
  }
});

// node_modules/.pnpm/yallist@4.0.0/node_modules/yallist/yallist.js
var require_yallist = __commonJS({
  "node_modules/.pnpm/yallist@4.0.0/node_modules/yallist/yallist.js"(exports, module2) {
    "use strict";
    module2.exports = Yallist;
    Yallist.Node = Node;
    Yallist.create = Yallist;
    function Yallist(list) {
      var self2 = this;
      if (!(self2 instanceof Yallist)) {
        self2 = new Yallist();
      }
      self2.tail = null;
      self2.head = null;
      self2.length = 0;
      if (list && typeof list.forEach === "function") {
        list.forEach(function(item) {
          self2.push(item);
        });
      } else if (arguments.length > 0) {
        for (var i2 = 0, l = arguments.length; i2 < l; i2++) {
          self2.push(arguments[i2]);
        }
      }
      return self2;
    }
    Yallist.prototype.removeNode = function(node) {
      if (node.list !== this) {
        throw new Error("removing node which does not belong to this list");
      }
      var next = node.next;
      var prev = node.prev;
      if (next) {
        next.prev = prev;
      }
      if (prev) {
        prev.next = next;
      }
      if (node === this.head) {
        this.head = next;
      }
      if (node === this.tail) {
        this.tail = prev;
      }
      node.list.length--;
      node.next = null;
      node.prev = null;
      node.list = null;
      return next;
    };
    Yallist.prototype.unshiftNode = function(node) {
      if (node === this.head) {
        return;
      }
      if (node.list) {
        node.list.removeNode(node);
      }
      var head = this.head;
      node.list = this;
      node.next = head;
      if (head) {
        head.prev = node;
      }
      this.head = node;
      if (!this.tail) {
        this.tail = node;
      }
      this.length++;
    };
    Yallist.prototype.pushNode = function(node) {
      if (node === this.tail) {
        return;
      }
      if (node.list) {
        node.list.removeNode(node);
      }
      var tail = this.tail;
      node.list = this;
      node.prev = tail;
      if (tail) {
        tail.next = node;
      }
      this.tail = node;
      if (!this.head) {
        this.head = node;
      }
      this.length++;
    };
    Yallist.prototype.push = function() {
      for (var i2 = 0, l = arguments.length; i2 < l; i2++) {
        push(this, arguments[i2]);
      }
      return this.length;
    };
    Yallist.prototype.unshift = function() {
      for (var i2 = 0, l = arguments.length; i2 < l; i2++) {
        unshift(this, arguments[i2]);
      }
      return this.length;
    };
    Yallist.prototype.pop = function() {
      if (!this.tail) {
        return void 0;
      }
      var res = this.tail.value;
      this.tail = this.tail.prev;
      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }
      this.length--;
      return res;
    };
    Yallist.prototype.shift = function() {
      if (!this.head) {
        return void 0;
      }
      var res = this.head.value;
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
      this.length--;
      return res;
    };
    Yallist.prototype.forEach = function(fn, thisp) {
      thisp = thisp || this;
      for (var walker = this.head, i2 = 0; walker !== null; i2++) {
        fn.call(thisp, walker.value, i2, this);
        walker = walker.next;
      }
    };
    Yallist.prototype.forEachReverse = function(fn, thisp) {
      thisp = thisp || this;
      for (var walker = this.tail, i2 = this.length - 1; walker !== null; i2--) {
        fn.call(thisp, walker.value, i2, this);
        walker = walker.prev;
      }
    };
    Yallist.prototype.get = function(n) {
      for (var i2 = 0, walker = this.head; walker !== null && i2 < n; i2++) {
        walker = walker.next;
      }
      if (i2 === n && walker !== null) {
        return walker.value;
      }
    };
    Yallist.prototype.getReverse = function(n) {
      for (var i2 = 0, walker = this.tail; walker !== null && i2 < n; i2++) {
        walker = walker.prev;
      }
      if (i2 === n && walker !== null) {
        return walker.value;
      }
    };
    Yallist.prototype.map = function(fn, thisp) {
      thisp = thisp || this;
      var res = new Yallist();
      for (var walker = this.head; walker !== null; ) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.next;
      }
      return res;
    };
    Yallist.prototype.mapReverse = function(fn, thisp) {
      thisp = thisp || this;
      var res = new Yallist();
      for (var walker = this.tail; walker !== null; ) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.prev;
      }
      return res;
    };
    Yallist.prototype.reduce = function(fn, initial) {
      var acc;
      var walker = this.head;
      if (arguments.length > 1) {
        acc = initial;
      } else if (this.head) {
        walker = this.head.next;
        acc = this.head.value;
      } else {
        throw new TypeError("Reduce of empty list with no initial value");
      }
      for (var i2 = 0; walker !== null; i2++) {
        acc = fn(acc, walker.value, i2);
        walker = walker.next;
      }
      return acc;
    };
    Yallist.prototype.reduceReverse = function(fn, initial) {
      var acc;
      var walker = this.tail;
      if (arguments.length > 1) {
        acc = initial;
      } else if (this.tail) {
        walker = this.tail.prev;
        acc = this.tail.value;
      } else {
        throw new TypeError("Reduce of empty list with no initial value");
      }
      for (var i2 = this.length - 1; walker !== null; i2--) {
        acc = fn(acc, walker.value, i2);
        walker = walker.prev;
      }
      return acc;
    };
    Yallist.prototype.toArray = function() {
      var arr = new Array(this.length);
      for (var i2 = 0, walker = this.head; walker !== null; i2++) {
        arr[i2] = walker.value;
        walker = walker.next;
      }
      return arr;
    };
    Yallist.prototype.toArrayReverse = function() {
      var arr = new Array(this.length);
      for (var i2 = 0, walker = this.tail; walker !== null; i2++) {
        arr[i2] = walker.value;
        walker = walker.prev;
      }
      return arr;
    };
    Yallist.prototype.slice = function(from, to) {
      to = to || this.length;
      if (to < 0) {
        to += this.length;
      }
      from = from || 0;
      if (from < 0) {
        from += this.length;
      }
      var ret = new Yallist();
      if (to < from || to < 0) {
        return ret;
      }
      if (from < 0) {
        from = 0;
      }
      if (to > this.length) {
        to = this.length;
      }
      for (var i2 = 0, walker = this.head; walker !== null && i2 < from; i2++) {
        walker = walker.next;
      }
      for (; walker !== null && i2 < to; i2++, walker = walker.next) {
        ret.push(walker.value);
      }
      return ret;
    };
    Yallist.prototype.sliceReverse = function(from, to) {
      to = to || this.length;
      if (to < 0) {
        to += this.length;
      }
      from = from || 0;
      if (from < 0) {
        from += this.length;
      }
      var ret = new Yallist();
      if (to < from || to < 0) {
        return ret;
      }
      if (from < 0) {
        from = 0;
      }
      if (to > this.length) {
        to = this.length;
      }
      for (var i2 = this.length, walker = this.tail; walker !== null && i2 > to; i2--) {
        walker = walker.prev;
      }
      for (; walker !== null && i2 > from; i2--, walker = walker.prev) {
        ret.push(walker.value);
      }
      return ret;
    };
    Yallist.prototype.splice = function(start, deleteCount, ...nodes) {
      if (start > this.length) {
        start = this.length - 1;
      }
      if (start < 0) {
        start = this.length + start;
      }
      for (var i2 = 0, walker = this.head; walker !== null && i2 < start; i2++) {
        walker = walker.next;
      }
      var ret = [];
      for (var i2 = 0; walker && i2 < deleteCount; i2++) {
        ret.push(walker.value);
        walker = this.removeNode(walker);
      }
      if (walker === null) {
        walker = this.tail;
      }
      if (walker !== this.head && walker !== this.tail) {
        walker = walker.prev;
      }
      for (var i2 = 0; i2 < nodes.length; i2++) {
        walker = insert(this, walker, nodes[i2]);
      }
      return ret;
    };
    Yallist.prototype.reverse = function() {
      var head = this.head;
      var tail = this.tail;
      for (var walker = head; walker !== null; walker = walker.prev) {
        var p = walker.prev;
        walker.prev = walker.next;
        walker.next = p;
      }
      this.head = tail;
      this.tail = head;
      return this;
    };
    function insert(self2, node, value) {
      var inserted = node === self2.head ? new Node(value, null, node, self2) : new Node(value, node, node.next, self2);
      if (inserted.next === null) {
        self2.tail = inserted;
      }
      if (inserted.prev === null) {
        self2.head = inserted;
      }
      self2.length++;
      return inserted;
    }
    function push(self2, item) {
      self2.tail = new Node(item, self2.tail, null, self2);
      if (!self2.head) {
        self2.head = self2.tail;
      }
      self2.length++;
    }
    function unshift(self2, item) {
      self2.head = new Node(item, null, self2.head, self2);
      if (!self2.tail) {
        self2.tail = self2.head;
      }
      self2.length++;
    }
    function Node(value, prev, next, list) {
      if (!(this instanceof Node)) {
        return new Node(value, prev, next, list);
      }
      this.list = list;
      this.value = value;
      if (prev) {
        prev.next = this;
        this.prev = prev;
      } else {
        this.prev = null;
      }
      if (next) {
        next.prev = this;
        this.next = next;
      } else {
        this.next = null;
      }
    }
    try {
      require_iterator()(Yallist);
    } catch (er) {
    }
  }
});

// node_modules/.pnpm/redis-errors@1.2.0/node_modules/redis-errors/lib/old.js
var require_old = __commonJS({
  "node_modules/.pnpm/redis-errors@1.2.0/node_modules/redis-errors/lib/old.js"(exports, module2) {
    "use strict";
    var assert = require("assert");
    var util = require("util");
    function RedisError(message) {
      Object.defineProperty(this, "message", {
        value: message || "",
        configurable: true,
        writable: true
      });
      Error.captureStackTrace(this, this.constructor);
    }
    util.inherits(RedisError, Error);
    Object.defineProperty(RedisError.prototype, "name", {
      value: "RedisError",
      configurable: true,
      writable: true
    });
    function ParserError(message, buffer, offset) {
      assert(buffer);
      assert.strictEqual(typeof offset, "number");
      Object.defineProperty(this, "message", {
        value: message || "",
        configurable: true,
        writable: true
      });
      const tmp = Error.stackTraceLimit;
      Error.stackTraceLimit = 2;
      Error.captureStackTrace(this, this.constructor);
      Error.stackTraceLimit = tmp;
      this.offset = offset;
      this.buffer = buffer;
    }
    util.inherits(ParserError, RedisError);
    Object.defineProperty(ParserError.prototype, "name", {
      value: "ParserError",
      configurable: true,
      writable: true
    });
    function ReplyError(message) {
      Object.defineProperty(this, "message", {
        value: message || "",
        configurable: true,
        writable: true
      });
      const tmp = Error.stackTraceLimit;
      Error.stackTraceLimit = 2;
      Error.captureStackTrace(this, this.constructor);
      Error.stackTraceLimit = tmp;
    }
    util.inherits(ReplyError, RedisError);
    Object.defineProperty(ReplyError.prototype, "name", {
      value: "ReplyError",
      configurable: true,
      writable: true
    });
    function AbortError2(message) {
      Object.defineProperty(this, "message", {
        value: message || "",
        configurable: true,
        writable: true
      });
      Error.captureStackTrace(this, this.constructor);
    }
    util.inherits(AbortError2, RedisError);
    Object.defineProperty(AbortError2.prototype, "name", {
      value: "AbortError",
      configurable: true,
      writable: true
    });
    function InterruptError(message) {
      Object.defineProperty(this, "message", {
        value: message || "",
        configurable: true,
        writable: true
      });
      Error.captureStackTrace(this, this.constructor);
    }
    util.inherits(InterruptError, AbortError2);
    Object.defineProperty(InterruptError.prototype, "name", {
      value: "InterruptError",
      configurable: true,
      writable: true
    });
    module2.exports = {
      RedisError,
      ParserError,
      ReplyError,
      AbortError: AbortError2,
      InterruptError
    };
  }
});

// node_modules/.pnpm/redis-errors@1.2.0/node_modules/redis-errors/lib/modern.js
var require_modern = __commonJS({
  "node_modules/.pnpm/redis-errors@1.2.0/node_modules/redis-errors/lib/modern.js"(exports, module2) {
    "use strict";
    var assert = require("assert");
    var RedisError = class extends Error {
      get name() {
        return this.constructor.name;
      }
    };
    var ParserError = class extends RedisError {
      constructor(message, buffer, offset) {
        assert(buffer);
        assert.strictEqual(typeof offset, "number");
        const tmp = Error.stackTraceLimit;
        Error.stackTraceLimit = 2;
        super(message);
        Error.stackTraceLimit = tmp;
        this.offset = offset;
        this.buffer = buffer;
      }
      get name() {
        return this.constructor.name;
      }
    };
    var ReplyError = class extends RedisError {
      constructor(message) {
        const tmp = Error.stackTraceLimit;
        Error.stackTraceLimit = 2;
        super(message);
        Error.stackTraceLimit = tmp;
      }
      get name() {
        return this.constructor.name;
      }
    };
    var AbortError2 = class extends RedisError {
      get name() {
        return this.constructor.name;
      }
    };
    var InterruptError = class extends AbortError2 {
      get name() {
        return this.constructor.name;
      }
    };
    module2.exports = {
      RedisError,
      ParserError,
      ReplyError,
      AbortError: AbortError2,
      InterruptError
    };
  }
});

// node_modules/.pnpm/redis-errors@1.2.0/node_modules/redis-errors/index.js
var require_redis_errors = __commonJS({
  "node_modules/.pnpm/redis-errors@1.2.0/node_modules/redis-errors/index.js"(exports, module2) {
    "use strict";
    var Errors = process.version.charCodeAt(1) < 55 && process.version.charCodeAt(2) === 46 ? require_old() : require_modern();
    module2.exports = Errors;
  }
});

// node_modules/.pnpm/redis-parser@3.0.0/node_modules/redis-parser/lib/parser.js
var require_parser = __commonJS({
  "node_modules/.pnpm/redis-parser@3.0.0/node_modules/redis-parser/lib/parser.js"(exports, module2) {
    "use strict";
    var Buffer2 = require("buffer").Buffer;
    var StringDecoder = require("string_decoder").StringDecoder;
    var decoder = new StringDecoder();
    var errors = require_redis_errors();
    var ReplyError = errors.ReplyError;
    var ParserError = errors.ParserError;
    var bufferPool = Buffer2.allocUnsafe(32 * 1024);
    var bufferOffset = 0;
    var interval = null;
    var counter = 0;
    var notDecreased = 0;
    function parseSimpleNumbers(parser) {
      const length = parser.buffer.length - 1;
      var offset = parser.offset;
      var number = 0;
      var sign = 1;
      if (parser.buffer[offset] === 45) {
        sign = -1;
        offset++;
      }
      while (offset < length) {
        const c1 = parser.buffer[offset++];
        if (c1 === 13) {
          parser.offset = offset + 1;
          return sign * number;
        }
        number = number * 10 + (c1 - 48);
      }
    }
    function parseStringNumbers(parser) {
      const length = parser.buffer.length - 1;
      var offset = parser.offset;
      var number = 0;
      var res = "";
      if (parser.buffer[offset] === 45) {
        res += "-";
        offset++;
      }
      while (offset < length) {
        var c1 = parser.buffer[offset++];
        if (c1 === 13) {
          parser.offset = offset + 1;
          if (number !== 0) {
            res += number;
          }
          return res;
        } else if (number > 429496728) {
          res += number * 10 + (c1 - 48);
          number = 0;
        } else if (c1 === 48 && number === 0) {
          res += 0;
        } else {
          number = number * 10 + (c1 - 48);
        }
      }
    }
    function parseSimpleString(parser) {
      const start = parser.offset;
      const buffer = parser.buffer;
      const length = buffer.length - 1;
      var offset = start;
      while (offset < length) {
        if (buffer[offset++] === 13) {
          parser.offset = offset + 1;
          if (parser.optionReturnBuffers === true) {
            return parser.buffer.slice(start, offset - 1);
          }
          return parser.buffer.toString("utf8", start, offset - 1);
        }
      }
    }
    function parseLength(parser) {
      const length = parser.buffer.length - 1;
      var offset = parser.offset;
      var number = 0;
      while (offset < length) {
        const c1 = parser.buffer[offset++];
        if (c1 === 13) {
          parser.offset = offset + 1;
          return number;
        }
        number = number * 10 + (c1 - 48);
      }
    }
    function parseInteger(parser) {
      if (parser.optionStringNumbers === true) {
        return parseStringNumbers(parser);
      }
      return parseSimpleNumbers(parser);
    }
    function parseBulkString(parser) {
      const length = parseLength(parser);
      if (length === void 0) {
        return;
      }
      if (length < 0) {
        return null;
      }
      const offset = parser.offset + length;
      if (offset + 2 > parser.buffer.length) {
        parser.bigStrSize = offset + 2;
        parser.totalChunkSize = parser.buffer.length;
        parser.bufferCache.push(parser.buffer);
        return;
      }
      const start = parser.offset;
      parser.offset = offset + 2;
      if (parser.optionReturnBuffers === true) {
        return parser.buffer.slice(start, offset);
      }
      return parser.buffer.toString("utf8", start, offset);
    }
    function parseError(parser) {
      var string = parseSimpleString(parser);
      if (string !== void 0) {
        if (parser.optionReturnBuffers === true) {
          string = string.toString();
        }
        return new ReplyError(string);
      }
    }
    function handleError(parser, type) {
      const err = new ParserError("Protocol error, got " + JSON.stringify(String.fromCharCode(type)) + " as reply type byte", JSON.stringify(parser.buffer), parser.offset);
      parser.buffer = null;
      parser.returnFatalError(err);
    }
    function parseArray(parser) {
      const length = parseLength(parser);
      if (length === void 0) {
        return;
      }
      if (length < 0) {
        return null;
      }
      const responses = new Array(length);
      return parseArrayElements(parser, responses, 0);
    }
    function pushArrayCache(parser, array, pos) {
      parser.arrayCache.push(array);
      parser.arrayPos.push(pos);
    }
    function parseArrayChunks(parser) {
      const tmp = parser.arrayCache.pop();
      var pos = parser.arrayPos.pop();
      if (parser.arrayCache.length) {
        const res = parseArrayChunks(parser);
        if (res === void 0) {
          pushArrayCache(parser, tmp, pos);
          return;
        }
        tmp[pos++] = res;
      }
      return parseArrayElements(parser, tmp, pos);
    }
    function parseArrayElements(parser, responses, i2) {
      const bufferLength = parser.buffer.length;
      while (i2 < responses.length) {
        const offset = parser.offset;
        if (parser.offset >= bufferLength) {
          pushArrayCache(parser, responses, i2);
          return;
        }
        const response = parseType(parser, parser.buffer[parser.offset++]);
        if (response === void 0) {
          if (!(parser.arrayCache.length || parser.bufferCache.length)) {
            parser.offset = offset;
          }
          pushArrayCache(parser, responses, i2);
          return;
        }
        responses[i2] = response;
        i2++;
      }
      return responses;
    }
    function parseType(parser, type) {
      switch (type) {
        case 36:
          return parseBulkString(parser);
        case 43:
          return parseSimpleString(parser);
        case 42:
          return parseArray(parser);
        case 58:
          return parseInteger(parser);
        case 45:
          return parseError(parser);
        default:
          return handleError(parser, type);
      }
    }
    function decreaseBufferPool() {
      if (bufferPool.length > 50 * 1024) {
        if (counter === 1 || notDecreased > counter * 2) {
          const minSliceLen = Math.floor(bufferPool.length / 10);
          const sliceLength = minSliceLen < bufferOffset ? bufferOffset : minSliceLen;
          bufferOffset = 0;
          bufferPool = bufferPool.slice(sliceLength, bufferPool.length);
        } else {
          notDecreased++;
          counter--;
        }
      } else {
        clearInterval(interval);
        counter = 0;
        notDecreased = 0;
        interval = null;
      }
    }
    function resizeBuffer(length) {
      if (bufferPool.length < length + bufferOffset) {
        const multiplier = length > 1024 * 1024 * 75 ? 2 : 3;
        if (bufferOffset > 1024 * 1024 * 111) {
          bufferOffset = 1024 * 1024 * 50;
        }
        bufferPool = Buffer2.allocUnsafe(length * multiplier + bufferOffset);
        bufferOffset = 0;
        counter++;
        if (interval === null) {
          interval = setInterval(decreaseBufferPool, 50);
        }
      }
    }
    function concatBulkString(parser) {
      const list = parser.bufferCache;
      const oldOffset = parser.offset;
      var chunks = list.length;
      var offset = parser.bigStrSize - parser.totalChunkSize;
      parser.offset = offset;
      if (offset <= 2) {
        if (chunks === 2) {
          return list[0].toString("utf8", oldOffset, list[0].length + offset - 2);
        }
        chunks--;
        offset = list[list.length - 2].length + offset;
      }
      var res = decoder.write(list[0].slice(oldOffset));
      for (var i2 = 1; i2 < chunks - 1; i2++) {
        res += decoder.write(list[i2]);
      }
      res += decoder.end(list[i2].slice(0, offset - 2));
      return res;
    }
    function concatBulkBuffer(parser) {
      const list = parser.bufferCache;
      const oldOffset = parser.offset;
      const length = parser.bigStrSize - oldOffset - 2;
      var chunks = list.length;
      var offset = parser.bigStrSize - parser.totalChunkSize;
      parser.offset = offset;
      if (offset <= 2) {
        if (chunks === 2) {
          return list[0].slice(oldOffset, list[0].length + offset - 2);
        }
        chunks--;
        offset = list[list.length - 2].length + offset;
      }
      resizeBuffer(length);
      const start = bufferOffset;
      list[0].copy(bufferPool, start, oldOffset, list[0].length);
      bufferOffset += list[0].length - oldOffset;
      for (var i2 = 1; i2 < chunks - 1; i2++) {
        list[i2].copy(bufferPool, bufferOffset);
        bufferOffset += list[i2].length;
      }
      list[i2].copy(bufferPool, bufferOffset, 0, offset - 2);
      bufferOffset += offset - 2;
      return bufferPool.slice(start, bufferOffset);
    }
    var JavascriptRedisParser = class {
      constructor(options) {
        if (!options) {
          throw new TypeError("Options are mandatory.");
        }
        if (typeof options.returnError !== "function" || typeof options.returnReply !== "function") {
          throw new TypeError("The returnReply and returnError options have to be functions.");
        }
        this.setReturnBuffers(!!options.returnBuffers);
        this.setStringNumbers(!!options.stringNumbers);
        this.returnError = options.returnError;
        this.returnFatalError = options.returnFatalError || options.returnError;
        this.returnReply = options.returnReply;
        this.reset();
      }
      reset() {
        this.offset = 0;
        this.buffer = null;
        this.bigStrSize = 0;
        this.totalChunkSize = 0;
        this.bufferCache = [];
        this.arrayCache = [];
        this.arrayPos = [];
      }
      setReturnBuffers(returnBuffers) {
        if (typeof returnBuffers !== "boolean") {
          throw new TypeError("The returnBuffers argument has to be a boolean");
        }
        this.optionReturnBuffers = returnBuffers;
      }
      setStringNumbers(stringNumbers) {
        if (typeof stringNumbers !== "boolean") {
          throw new TypeError("The stringNumbers argument has to be a boolean");
        }
        this.optionStringNumbers = stringNumbers;
      }
      execute(buffer) {
        if (this.buffer === null) {
          this.buffer = buffer;
          this.offset = 0;
        } else if (this.bigStrSize === 0) {
          const oldLength = this.buffer.length;
          const remainingLength = oldLength - this.offset;
          const newBuffer = Buffer2.allocUnsafe(remainingLength + buffer.length);
          this.buffer.copy(newBuffer, 0, this.offset, oldLength);
          buffer.copy(newBuffer, remainingLength, 0, buffer.length);
          this.buffer = newBuffer;
          this.offset = 0;
          if (this.arrayCache.length) {
            const arr = parseArrayChunks(this);
            if (arr === void 0) {
              return;
            }
            this.returnReply(arr);
          }
        } else if (this.totalChunkSize + buffer.length >= this.bigStrSize) {
          this.bufferCache.push(buffer);
          var tmp = this.optionReturnBuffers ? concatBulkBuffer(this) : concatBulkString(this);
          this.bigStrSize = 0;
          this.bufferCache = [];
          this.buffer = buffer;
          if (this.arrayCache.length) {
            this.arrayCache[0][this.arrayPos[0]++] = tmp;
            tmp = parseArrayChunks(this);
            if (tmp === void 0) {
              return;
            }
          }
          this.returnReply(tmp);
        } else {
          this.bufferCache.push(buffer);
          this.totalChunkSize += buffer.length;
          return;
        }
        while (this.offset < this.buffer.length) {
          const offset = this.offset;
          const type = this.buffer[this.offset++];
          const response = parseType(this, type);
          if (response === void 0) {
            if (!(this.arrayCache.length || this.bufferCache.length)) {
              this.offset = offset;
            }
            return;
          }
          if (type === 45) {
            this.returnError(response);
          } else {
            this.returnReply(response);
          }
        }
        this.buffer = null;
      }
    };
    module2.exports = JavascriptRedisParser;
  }
});

// node_modules/.pnpm/redis-parser@3.0.0/node_modules/redis-parser/index.js
var require_redis_parser = __commonJS({
  "node_modules/.pnpm/redis-parser@3.0.0/node_modules/redis-parser/index.js"(exports, module2) {
    "use strict";
    module2.exports = require_parser();
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/client/commands-queue.js
var require_commands_queue = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/client/commands-queue.js"(exports) {
    "use strict";
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f3) {
      if (kind === "m")
        throw new TypeError("Private method is not writable");
      if (kind === "a" && !f3)
        throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
        throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f3.call(receiver, value) : f3 ? f3.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f3) {
      if (kind === "a" && !f3)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f3 : kind === "a" ? f3.call(receiver) : f3 ? f3.value : state.get(receiver);
    };
    var _RedisCommandsQueue_instances;
    var _a4;
    var _RedisCommandsQueue_flushQueue;
    var _RedisCommandsQueue_emitPubSubMessage;
    var _RedisCommandsQueue_maxLength;
    var _RedisCommandsQueue_waitingToBeSent;
    var _RedisCommandsQueue_waitingForReply;
    var _RedisCommandsQueue_pubSubState;
    var _RedisCommandsQueue_PUB_SUB_MESSAGES;
    var _RedisCommandsQueue_parser;
    var _RedisCommandsQueue_chainInExecution;
    var _RedisCommandsQueue_initiatePubSubState;
    var _RedisCommandsQueue_pushPubSubCommand;
    var _RedisCommandsQueue_setReturnBuffers;
    var _RedisCommandsQueue_shiftWaitingForReply;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PubSubUnsubscribeCommands = exports.PubSubSubscribeCommands = void 0;
    var LinkedList = require_yallist();
    var errors_1 = require_errors();
    var RedisParser = require_redis_parser();
    var PubSubSubscribeCommands;
    (function(PubSubSubscribeCommands2) {
      PubSubSubscribeCommands2["SUBSCRIBE"] = "SUBSCRIBE";
      PubSubSubscribeCommands2["PSUBSCRIBE"] = "PSUBSCRIBE";
    })(PubSubSubscribeCommands = exports.PubSubSubscribeCommands || (exports.PubSubSubscribeCommands = {}));
    var PubSubUnsubscribeCommands;
    (function(PubSubUnsubscribeCommands2) {
      PubSubUnsubscribeCommands2["UNSUBSCRIBE"] = "UNSUBSCRIBE";
      PubSubUnsubscribeCommands2["PUNSUBSCRIBE"] = "PUNSUBSCRIBE";
    })(PubSubUnsubscribeCommands = exports.PubSubUnsubscribeCommands || (exports.PubSubUnsubscribeCommands = {}));
    var RedisCommandsQueue = class {
      constructor(maxLength) {
        _RedisCommandsQueue_instances.add(this);
        _RedisCommandsQueue_maxLength.set(this, void 0);
        _RedisCommandsQueue_waitingToBeSent.set(this, new LinkedList());
        _RedisCommandsQueue_waitingForReply.set(this, new LinkedList());
        _RedisCommandsQueue_pubSubState.set(this, void 0);
        _RedisCommandsQueue_parser.set(this, new RedisParser({
          returnReply: (reply) => {
            if (__classPrivateFieldGet(this, _RedisCommandsQueue_pubSubState, "f") && Array.isArray(reply)) {
              if (__classPrivateFieldGet(RedisCommandsQueue, _a4, "f", _RedisCommandsQueue_PUB_SUB_MESSAGES).message.equals(reply[0])) {
                return __classPrivateFieldGet(RedisCommandsQueue, _a4, "m", _RedisCommandsQueue_emitPubSubMessage).call(RedisCommandsQueue, __classPrivateFieldGet(this, _RedisCommandsQueue_pubSubState, "f").listeners.channels, reply[2], reply[1]);
              } else if (__classPrivateFieldGet(RedisCommandsQueue, _a4, "f", _RedisCommandsQueue_PUB_SUB_MESSAGES).pMessage.equals(reply[0])) {
                return __classPrivateFieldGet(RedisCommandsQueue, _a4, "m", _RedisCommandsQueue_emitPubSubMessage).call(RedisCommandsQueue, __classPrivateFieldGet(this, _RedisCommandsQueue_pubSubState, "f").listeners.patterns, reply[3], reply[2], reply[1]);
              } else if (__classPrivateFieldGet(RedisCommandsQueue, _a4, "f", _RedisCommandsQueue_PUB_SUB_MESSAGES).subscribe.equals(reply[0]) || __classPrivateFieldGet(RedisCommandsQueue, _a4, "f", _RedisCommandsQueue_PUB_SUB_MESSAGES).pSubscribe.equals(reply[0]) || __classPrivateFieldGet(RedisCommandsQueue, _a4, "f", _RedisCommandsQueue_PUB_SUB_MESSAGES).unsubscribe.equals(reply[0]) || __classPrivateFieldGet(RedisCommandsQueue, _a4, "f", _RedisCommandsQueue_PUB_SUB_MESSAGES).pUnsubscribe.equals(reply[0])) {
                if (--__classPrivateFieldGet(this, _RedisCommandsQueue_waitingForReply, "f").head.value.channelsCounter === 0) {
                  __classPrivateFieldGet(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_shiftWaitingForReply).call(this).resolve();
                }
                return;
              }
            }
            __classPrivateFieldGet(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_shiftWaitingForReply).call(this).resolve(reply);
          },
          returnError: (err) => __classPrivateFieldGet(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_shiftWaitingForReply).call(this).reject(err)
        }));
        _RedisCommandsQueue_chainInExecution.set(this, void 0);
        __classPrivateFieldSet(this, _RedisCommandsQueue_maxLength, maxLength, "f");
      }
      addCommand(args, options) {
        var _b;
        if (__classPrivateFieldGet(this, _RedisCommandsQueue_pubSubState, "f") && !(options === null || options === void 0 ? void 0 : options.ignorePubSubMode)) {
          return Promise.reject(new Error("Cannot send commands in PubSub mode"));
        } else if (__classPrivateFieldGet(this, _RedisCommandsQueue_maxLength, "f") && __classPrivateFieldGet(this, _RedisCommandsQueue_waitingToBeSent, "f").length + __classPrivateFieldGet(this, _RedisCommandsQueue_waitingForReply, "f").length >= __classPrivateFieldGet(this, _RedisCommandsQueue_maxLength, "f")) {
          return Promise.reject(new Error("The queue is full"));
        } else if ((_b = options === null || options === void 0 ? void 0 : options.signal) === null || _b === void 0 ? void 0 : _b.aborted) {
          return Promise.reject(new errors_1.AbortError());
        }
        return new Promise((resolve2, reject) => {
          const node = new LinkedList.Node({
            args,
            chainId: options === null || options === void 0 ? void 0 : options.chainId,
            returnBuffers: options === null || options === void 0 ? void 0 : options.returnBuffers,
            resolve: resolve2,
            reject
          });
          if (options === null || options === void 0 ? void 0 : options.signal) {
            const listener = () => {
              __classPrivateFieldGet(this, _RedisCommandsQueue_waitingToBeSent, "f").removeNode(node);
              node.value.reject(new errors_1.AbortError());
            };
            node.value.abort = {
              signal: options.signal,
              listener
            };
            options.signal.addEventListener("abort", listener, {
              once: true
            });
          }
          if (options === null || options === void 0 ? void 0 : options.asap) {
            __classPrivateFieldGet(this, _RedisCommandsQueue_waitingToBeSent, "f").unshiftNode(node);
          } else {
            __classPrivateFieldGet(this, _RedisCommandsQueue_waitingToBeSent, "f").pushNode(node);
          }
        });
      }
      subscribe(command, channels, listener, returnBuffers) {
        const pubSubState = __classPrivateFieldGet(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_initiatePubSubState).call(this), channelsToSubscribe = [], listenersMap = command === PubSubSubscribeCommands.SUBSCRIBE ? pubSubState.listeners.channels : pubSubState.listeners.patterns;
        for (const channel of Array.isArray(channels) ? channels : [channels]) {
          const channelString = typeof channel === "string" ? channel : channel.toString();
          let listeners = listenersMap.get(channelString);
          if (!listeners) {
            listeners = {
              buffers: /* @__PURE__ */ new Set(),
              strings: /* @__PURE__ */ new Set()
            };
            listenersMap.set(channelString, listeners);
            channelsToSubscribe.push(channel);
          }
          (returnBuffers ? listeners.buffers : listeners.strings).add(listener);
        }
        if (!channelsToSubscribe.length) {
          return Promise.resolve();
        }
        return __classPrivateFieldGet(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_pushPubSubCommand).call(this, command, channelsToSubscribe);
      }
      unsubscribe(command, channels, listener, returnBuffers) {
        if (!__classPrivateFieldGet(this, _RedisCommandsQueue_pubSubState, "f")) {
          return Promise.resolve();
        }
        const listeners = command === PubSubUnsubscribeCommands.UNSUBSCRIBE ? __classPrivateFieldGet(this, _RedisCommandsQueue_pubSubState, "f").listeners.channels : __classPrivateFieldGet(this, _RedisCommandsQueue_pubSubState, "f").listeners.patterns;
        if (!channels) {
          const size = listeners.size;
          listeners.clear();
          return __classPrivateFieldGet(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_pushPubSubCommand).call(this, command, size);
        }
        const channelsToUnsubscribe = [];
        for (const channel of Array.isArray(channels) ? channels : [channels]) {
          const sets = listeners.get(channel);
          if (!sets)
            continue;
          let shouldUnsubscribe;
          if (listener) {
            (returnBuffers ? sets.buffers : sets.strings).delete(listener);
            shouldUnsubscribe = !sets.buffers.size && !sets.strings.size;
          } else {
            shouldUnsubscribe = true;
          }
          if (shouldUnsubscribe) {
            channelsToUnsubscribe.push(channel);
            listeners.delete(channel);
          }
        }
        if (!channelsToUnsubscribe.length) {
          return Promise.resolve();
        }
        return __classPrivateFieldGet(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_pushPubSubCommand).call(this, command, channelsToUnsubscribe);
      }
      resubscribe() {
        if (!__classPrivateFieldGet(this, _RedisCommandsQueue_pubSubState, "f")) {
          return;
        }
        __classPrivateFieldGet(this, _RedisCommandsQueue_pubSubState, "f").subscribed = 0;
        const promises = [], { channels, patterns } = __classPrivateFieldGet(this, _RedisCommandsQueue_pubSubState, "f").listeners;
        if (channels.size) {
          promises.push(__classPrivateFieldGet(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_pushPubSubCommand).call(this, PubSubSubscribeCommands.SUBSCRIBE, [...channels.keys()]));
        }
        if (patterns.size) {
          promises.push(__classPrivateFieldGet(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_pushPubSubCommand).call(this, PubSubSubscribeCommands.PSUBSCRIBE, [...patterns.keys()]));
        }
        if (promises.length) {
          return Promise.all(promises);
        }
      }
      getCommandToSend() {
        const toSend = __classPrivateFieldGet(this, _RedisCommandsQueue_waitingToBeSent, "f").shift();
        if (toSend) {
          __classPrivateFieldGet(this, _RedisCommandsQueue_waitingForReply, "f").push({
            resolve: toSend.resolve,
            reject: toSend.reject,
            channelsCounter: toSend.channelsCounter,
            returnBuffers: toSend.returnBuffers
          });
        }
        __classPrivateFieldSet(this, _RedisCommandsQueue_chainInExecution, toSend === null || toSend === void 0 ? void 0 : toSend.chainId, "f");
        return toSend === null || toSend === void 0 ? void 0 : toSend.args;
      }
      parseResponse(data) {
        __classPrivateFieldGet(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_setReturnBuffers).call(this);
        __classPrivateFieldGet(this, _RedisCommandsQueue_parser, "f").execute(data);
      }
      flushWaitingForReply(err) {
        var _b;
        __classPrivateFieldGet(RedisCommandsQueue, _a4, "m", _RedisCommandsQueue_flushQueue).call(RedisCommandsQueue, __classPrivateFieldGet(this, _RedisCommandsQueue_waitingForReply, "f"), err);
        if (!__classPrivateFieldGet(this, _RedisCommandsQueue_chainInExecution, "f"))
          return;
        while (((_b = __classPrivateFieldGet(this, _RedisCommandsQueue_waitingToBeSent, "f").head) === null || _b === void 0 ? void 0 : _b.value.chainId) === __classPrivateFieldGet(this, _RedisCommandsQueue_chainInExecution, "f")) {
          __classPrivateFieldGet(this, _RedisCommandsQueue_waitingToBeSent, "f").shift();
        }
        __classPrivateFieldSet(this, _RedisCommandsQueue_chainInExecution, void 0, "f");
      }
      flushAll(err) {
        __classPrivateFieldGet(RedisCommandsQueue, _a4, "m", _RedisCommandsQueue_flushQueue).call(RedisCommandsQueue, __classPrivateFieldGet(this, _RedisCommandsQueue_waitingForReply, "f"), err);
        __classPrivateFieldGet(RedisCommandsQueue, _a4, "m", _RedisCommandsQueue_flushQueue).call(RedisCommandsQueue, __classPrivateFieldGet(this, _RedisCommandsQueue_waitingToBeSent, "f"), err);
      }
    };
    exports.default = RedisCommandsQueue;
    _a4 = RedisCommandsQueue, _RedisCommandsQueue_maxLength = /* @__PURE__ */ new WeakMap(), _RedisCommandsQueue_waitingToBeSent = /* @__PURE__ */ new WeakMap(), _RedisCommandsQueue_waitingForReply = /* @__PURE__ */ new WeakMap(), _RedisCommandsQueue_pubSubState = /* @__PURE__ */ new WeakMap(), _RedisCommandsQueue_parser = /* @__PURE__ */ new WeakMap(), _RedisCommandsQueue_chainInExecution = /* @__PURE__ */ new WeakMap(), _RedisCommandsQueue_instances = /* @__PURE__ */ new WeakSet(), _RedisCommandsQueue_flushQueue = function _RedisCommandsQueue_flushQueue2(queue, err) {
      while (queue.length) {
        queue.shift().reject(err);
      }
    }, _RedisCommandsQueue_emitPubSubMessage = function _RedisCommandsQueue_emitPubSubMessage2(listenersMap, message, channel, pattern) {
      const keyString = (pattern !== null && pattern !== void 0 ? pattern : channel).toString(), listeners = listenersMap.get(keyString);
      if (!listeners)
        return;
      for (const listener of listeners.buffers) {
        listener(message, channel);
      }
      if (!listeners.strings.size)
        return;
      const channelString = pattern ? channel.toString() : keyString, messageString = channelString === "__redis__:invalidate" ? message === null ? null : message.map((x2) => x2.toString()) : message.toString();
      for (const listener of listeners.strings) {
        listener(messageString, channelString);
      }
    }, _RedisCommandsQueue_initiatePubSubState = function _RedisCommandsQueue_initiatePubSubState2() {
      var _b;
      return __classPrivateFieldSet(this, _RedisCommandsQueue_pubSubState, (_b = __classPrivateFieldGet(this, _RedisCommandsQueue_pubSubState, "f")) !== null && _b !== void 0 ? _b : {
        subscribed: 0,
        subscribing: 0,
        unsubscribing: 0,
        listeners: {
          channels: /* @__PURE__ */ new Map(),
          patterns: /* @__PURE__ */ new Map()
        }
      }, "f");
    }, _RedisCommandsQueue_pushPubSubCommand = function _RedisCommandsQueue_pushPubSubCommand2(command, channels) {
      return new Promise((resolve2, reject) => {
        const pubSubState = __classPrivateFieldGet(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_initiatePubSubState).call(this), isSubscribe = command === PubSubSubscribeCommands.SUBSCRIBE || command === PubSubSubscribeCommands.PSUBSCRIBE, inProgressKey = isSubscribe ? "subscribing" : "unsubscribing", commandArgs = [command];
        let channelsCounter;
        if (typeof channels === "number") {
          channelsCounter = channels;
        } else {
          commandArgs.push(...channels);
          channelsCounter = channels.length;
        }
        pubSubState[inProgressKey] += channelsCounter;
        __classPrivateFieldGet(this, _RedisCommandsQueue_waitingToBeSent, "f").push({
          args: commandArgs,
          channelsCounter,
          returnBuffers: true,
          resolve: () => {
            pubSubState[inProgressKey] -= channelsCounter;
            if (isSubscribe) {
              pubSubState.subscribed += channelsCounter;
            } else {
              pubSubState.subscribed -= channelsCounter;
              if (!pubSubState.subscribed && !pubSubState.subscribing && !pubSubState.subscribed) {
                __classPrivateFieldSet(this, _RedisCommandsQueue_pubSubState, void 0, "f");
              }
            }
            resolve2();
          },
          reject: (err) => {
            pubSubState[inProgressKey] -= channelsCounter * (isSubscribe ? 1 : -1);
            reject(err);
          }
        });
      });
    }, _RedisCommandsQueue_setReturnBuffers = function _RedisCommandsQueue_setReturnBuffers2() {
      var _b, _c;
      __classPrivateFieldGet(this, _RedisCommandsQueue_parser, "f").setReturnBuffers(!!((_b = __classPrivateFieldGet(this, _RedisCommandsQueue_waitingForReply, "f").head) === null || _b === void 0 ? void 0 : _b.value.returnBuffers) || !!((_c = __classPrivateFieldGet(this, _RedisCommandsQueue_pubSubState, "f")) === null || _c === void 0 ? void 0 : _c.subscribed));
    }, _RedisCommandsQueue_shiftWaitingForReply = function _RedisCommandsQueue_shiftWaitingForReply2() {
      if (!__classPrivateFieldGet(this, _RedisCommandsQueue_waitingForReply, "f").length) {
        throw new Error("Got an unexpected reply from Redis");
      }
      const waitingForReply = __classPrivateFieldGet(this, _RedisCommandsQueue_waitingForReply, "f").shift();
      __classPrivateFieldGet(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_setReturnBuffers).call(this);
      return waitingForReply;
    };
    _RedisCommandsQueue_PUB_SUB_MESSAGES = { value: {
      message: Buffer.from("message"),
      pMessage: Buffer.from("pmessage"),
      subscribe: Buffer.from("subscribe"),
      pSubscribe: Buffer.from("psubscribe"),
      unsubscribe: Buffer.from("unsunscribe"),
      pUnsubscribe: Buffer.from("punsubscribe")
    } };
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/multi-command.js
var require_multi_command = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/multi-command.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var errors_1 = require_errors();
    var RedisMultiCommand = class {
      constructor() {
        Object.defineProperty(this, "queue", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: []
        });
        Object.defineProperty(this, "scriptsInUse", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: /* @__PURE__ */ new Set()
        });
      }
      static generateChainId() {
        return Symbol("RedisMultiCommand Chain Id");
      }
      addCommand(args, transformReply) {
        this.queue.push({
          args,
          transformReply
        });
      }
      addScript(script, args) {
        const transformedArguments = [];
        if (this.scriptsInUse.has(script.SHA1)) {
          transformedArguments.push("EVALSHA", script.SHA1);
        } else {
          this.scriptsInUse.add(script.SHA1);
          transformedArguments.push("EVAL", script.SCRIPT);
        }
        transformedArguments.push(script.NUMBER_OF_KEYS.toString());
        const scriptArguments = script.transformArguments(...args);
        transformedArguments.push(...scriptArguments);
        if (scriptArguments.preserve) {
          transformedArguments.preserve = scriptArguments.preserve;
        }
        this.addCommand(transformedArguments, script.transformReply);
        return transformedArguments;
      }
      exec() {
        if (!this.queue.length) {
          return;
        }
        return [
          { args: ["MULTI"] },
          ...this.queue,
          { args: ["EXEC"] }
        ];
      }
      handleExecReplies(rawReplies) {
        const execReply = rawReplies[rawReplies.length - 1];
        if (execReply === null) {
          throw new errors_1.WatchError();
        }
        return this.transformReplies(execReply);
      }
      transformReplies(rawReplies) {
        return rawReplies.map((reply, i2) => {
          const { transformReply, args } = this.queue[i2];
          return transformReply ? transformReply(reply, args.preserve) : reply;
        });
      }
    };
    exports.default = RedisMultiCommand;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/client/multi-command.js
var require_multi_command2 = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/client/multi-command.js"(exports) {
    "use strict";
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f3) {
      if (kind === "m")
        throw new TypeError("Private method is not writable");
      if (kind === "a" && !f3)
        throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
        throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f3.call(receiver, value) : f3 ? f3.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f3) {
      if (kind === "a" && !f3)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f3 : kind === "a" ? f3.call(receiver) : f3 ? f3.value : state.get(receiver);
    };
    var _RedisClientMultiCommand_instances;
    var _RedisClientMultiCommand_multi;
    var _RedisClientMultiCommand_executor;
    var _RedisClientMultiCommand_legacyMode;
    var _RedisClientMultiCommand_defineLegacyCommand;
    Object.defineProperty(exports, "__esModule", { value: true });
    var commands_1 = require_commands2();
    var multi_command_1 = require_multi_command();
    var commander_1 = require_commander();
    var RedisClientMultiCommand = class {
      constructor(executor, legacyMode = false) {
        _RedisClientMultiCommand_instances.add(this);
        _RedisClientMultiCommand_multi.set(this, new multi_command_1.default());
        _RedisClientMultiCommand_executor.set(this, void 0);
        Object.defineProperty(this, "v4", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: {}
        });
        Object.defineProperty(this, "EXEC", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: this.exec
        });
        __classPrivateFieldSet(this, _RedisClientMultiCommand_executor, executor, "f");
        if (legacyMode) {
          __classPrivateFieldGet(this, _RedisClientMultiCommand_instances, "m", _RedisClientMultiCommand_legacyMode).call(this);
        }
      }
      static extend(plugins) {
        return (0, commander_1.extendWithModulesAndScripts)({
          BaseClass: RedisClientMultiCommand,
          modules: plugins === null || plugins === void 0 ? void 0 : plugins.modules,
          modulesCommandsExecutor: RedisClientMultiCommand.prototype.commandsExecutor,
          scripts: plugins === null || plugins === void 0 ? void 0 : plugins.scripts,
          scriptsExecutor: RedisClientMultiCommand.prototype.scriptsExecutor
        });
      }
      commandsExecutor(command, args) {
        return this.addCommand(command.transformArguments(...args), command.transformReply);
      }
      addCommand(args, transformReply) {
        __classPrivateFieldGet(this, _RedisClientMultiCommand_multi, "f").addCommand(args, transformReply);
        return this;
      }
      scriptsExecutor(script, args) {
        __classPrivateFieldGet(this, _RedisClientMultiCommand_multi, "f").addScript(script, args);
        return this;
      }
      async exec(execAsPipeline = false) {
        if (execAsPipeline) {
          return this.execAsPipeline();
        }
        const commands = __classPrivateFieldGet(this, _RedisClientMultiCommand_multi, "f").exec();
        if (!commands)
          return [];
        return __classPrivateFieldGet(this, _RedisClientMultiCommand_multi, "f").handleExecReplies(await __classPrivateFieldGet(this, _RedisClientMultiCommand_executor, "f").call(this, commands, multi_command_1.default.generateChainId()));
      }
      async execAsPipeline() {
        if (!__classPrivateFieldGet(this, _RedisClientMultiCommand_multi, "f").queue.length)
          return [];
        return __classPrivateFieldGet(this, _RedisClientMultiCommand_multi, "f").transformReplies(await __classPrivateFieldGet(this, _RedisClientMultiCommand_executor, "f").call(this, __classPrivateFieldGet(this, _RedisClientMultiCommand_multi, "f").queue));
      }
    };
    exports.default = RedisClientMultiCommand;
    _RedisClientMultiCommand_multi = /* @__PURE__ */ new WeakMap(), _RedisClientMultiCommand_executor = /* @__PURE__ */ new WeakMap(), _RedisClientMultiCommand_instances = /* @__PURE__ */ new WeakSet(), _RedisClientMultiCommand_legacyMode = function _RedisClientMultiCommand_legacyMode2() {
      this.v4.addCommand = this.addCommand.bind(this);
      this.addCommand = (...args) => {
        __classPrivateFieldGet(this, _RedisClientMultiCommand_multi, "f").addCommand(args.flat());
        return this;
      };
      this.v4.exec = this.exec.bind(this);
      this.exec = (callback) => {
        this.v4.exec().then((reply) => {
          if (!callback)
            return;
          callback(null, reply);
        }).catch((err) => {
          if (!callback) {
            return;
          }
          callback(err);
        });
      };
      for (const name of Object.keys(commands_1.default)) {
        __classPrivateFieldGet(this, _RedisClientMultiCommand_instances, "m", _RedisClientMultiCommand_defineLegacyCommand).call(this, name);
      }
      for (const name of Object.keys(commands_1.default)) {
        this[name.toLowerCase()] = this[name];
      }
    }, _RedisClientMultiCommand_defineLegacyCommand = function _RedisClientMultiCommand_defineLegacyCommand2(name) {
      this.v4[name] = this[name].bind(this.v4);
      this[name] = (...args) => this.addCommand(name, args);
    };
    (0, commander_1.extendWithCommands)({
      BaseClass: RedisClientMultiCommand,
      commands: commands_1.default,
      executor: RedisClientMultiCommand.prototype.commandsExecutor
    });
  }
});

// node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/factoryValidator.js
var require_factoryValidator = __commonJS({
  "node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/factoryValidator.js"(exports, module2) {
    module2.exports = function(factory) {
      if (typeof factory.create !== "function") {
        throw new TypeError("factory.create must be a function");
      }
      if (typeof factory.destroy !== "function") {
        throw new TypeError("factory.destroy must be a function");
      }
      if (typeof factory.validate !== "undefined" && typeof factory.validate !== "function") {
        throw new TypeError("factory.validate must be a function");
      }
    };
  }
});

// node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/PoolDefaults.js
var require_PoolDefaults = __commonJS({
  "node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/PoolDefaults.js"(exports, module2) {
    "use strict";
    var PoolDefaults = class {
      constructor() {
        this.fifo = true;
        this.priorityRange = 1;
        this.testOnBorrow = false;
        this.testOnReturn = false;
        this.autostart = true;
        this.evictionRunIntervalMillis = 0;
        this.numTestsPerEvictionRun = 3;
        this.softIdleTimeoutMillis = -1;
        this.idleTimeoutMillis = 3e4;
        this.acquireTimeoutMillis = null;
        this.destroyTimeoutMillis = null;
        this.maxWaitingClients = null;
        this.min = null;
        this.max = null;
        this.Promise = Promise;
      }
    };
    module2.exports = PoolDefaults;
  }
});

// node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/PoolOptions.js
var require_PoolOptions = __commonJS({
  "node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/PoolOptions.js"(exports, module2) {
    "use strict";
    var PoolDefaults = require_PoolDefaults();
    var PoolOptions = class {
      constructor(opts) {
        const poolDefaults = new PoolDefaults();
        opts = opts || {};
        this.fifo = typeof opts.fifo === "boolean" ? opts.fifo : poolDefaults.fifo;
        this.priorityRange = opts.priorityRange || poolDefaults.priorityRange;
        this.testOnBorrow = typeof opts.testOnBorrow === "boolean" ? opts.testOnBorrow : poolDefaults.testOnBorrow;
        this.testOnReturn = typeof opts.testOnReturn === "boolean" ? opts.testOnReturn : poolDefaults.testOnReturn;
        this.autostart = typeof opts.autostart === "boolean" ? opts.autostart : poolDefaults.autostart;
        if (opts.acquireTimeoutMillis) {
          this.acquireTimeoutMillis = parseInt(opts.acquireTimeoutMillis, 10);
        }
        if (opts.destroyTimeoutMillis) {
          this.destroyTimeoutMillis = parseInt(opts.destroyTimeoutMillis, 10);
        }
        if (opts.maxWaitingClients !== void 0) {
          this.maxWaitingClients = parseInt(opts.maxWaitingClients, 10);
        }
        this.max = parseInt(opts.max, 10);
        this.min = parseInt(opts.min, 10);
        this.max = Math.max(isNaN(this.max) ? 1 : this.max, 1);
        this.min = Math.min(isNaN(this.min) ? 0 : this.min, this.max);
        this.evictionRunIntervalMillis = opts.evictionRunIntervalMillis || poolDefaults.evictionRunIntervalMillis;
        this.numTestsPerEvictionRun = opts.numTestsPerEvictionRun || poolDefaults.numTestsPerEvictionRun;
        this.softIdleTimeoutMillis = opts.softIdleTimeoutMillis || poolDefaults.softIdleTimeoutMillis;
        this.idleTimeoutMillis = opts.idleTimeoutMillis || poolDefaults.idleTimeoutMillis;
        this.Promise = opts.Promise != null ? opts.Promise : poolDefaults.Promise;
      }
    };
    module2.exports = PoolOptions;
  }
});

// node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/Deferred.js
var require_Deferred = __commonJS({
  "node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/Deferred.js"(exports, module2) {
    "use strict";
    var Deferred = class {
      constructor(Promise2) {
        this._state = Deferred.PENDING;
        this._resolve = void 0;
        this._reject = void 0;
        this._promise = new Promise2((resolve2, reject) => {
          this._resolve = resolve2;
          this._reject = reject;
        });
      }
      get state() {
        return this._state;
      }
      get promise() {
        return this._promise;
      }
      reject(reason) {
        if (this._state !== Deferred.PENDING) {
          return;
        }
        this._state = Deferred.REJECTED;
        this._reject(reason);
      }
      resolve(value) {
        if (this._state !== Deferred.PENDING) {
          return;
        }
        this._state = Deferred.FULFILLED;
        this._resolve(value);
      }
    };
    Deferred.PENDING = "PENDING";
    Deferred.FULFILLED = "FULFILLED";
    Deferred.REJECTED = "REJECTED";
    module2.exports = Deferred;
  }
});

// node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/errors.js
var require_errors2 = __commonJS({
  "node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/errors.js"(exports, module2) {
    "use strict";
    var ExtendableError = class extends Error {
      constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        if (typeof Error.captureStackTrace === "function") {
          Error.captureStackTrace(this, this.constructor);
        } else {
          this.stack = new Error(message).stack;
        }
      }
    };
    var TimeoutError = class extends ExtendableError {
      constructor(m2) {
        super(m2);
      }
    };
    module2.exports = {
      TimeoutError
    };
  }
});

// node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/ResourceRequest.js
var require_ResourceRequest = __commonJS({
  "node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/ResourceRequest.js"(exports, module2) {
    "use strict";
    var Deferred = require_Deferred();
    var errors = require_errors2();
    function fbind(fn, ctx) {
      return function bound() {
        return fn.apply(ctx, arguments);
      };
    }
    var ResourceRequest = class extends Deferred {
      constructor(ttl, Promise2) {
        super(Promise2);
        this._creationTimestamp = Date.now();
        this._timeout = null;
        if (ttl !== void 0) {
          this.setTimeout(ttl);
        }
      }
      setTimeout(delay) {
        if (this._state !== ResourceRequest.PENDING) {
          return;
        }
        const ttl = parseInt(delay, 10);
        if (isNaN(ttl) || ttl <= 0) {
          throw new Error("delay must be a positive int");
        }
        const age = Date.now() - this._creationTimestamp;
        if (this._timeout) {
          this.removeTimeout();
        }
        this._timeout = setTimeout(fbind(this._fireTimeout, this), Math.max(ttl - age, 0));
      }
      removeTimeout() {
        if (this._timeout) {
          clearTimeout(this._timeout);
        }
        this._timeout = null;
      }
      _fireTimeout() {
        this.reject(new errors.TimeoutError("ResourceRequest timed out"));
      }
      reject(reason) {
        this.removeTimeout();
        super.reject(reason);
      }
      resolve(value) {
        this.removeTimeout();
        super.resolve(value);
      }
    };
    module2.exports = ResourceRequest;
  }
});

// node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/ResourceLoan.js
var require_ResourceLoan = __commonJS({
  "node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/ResourceLoan.js"(exports, module2) {
    "use strict";
    var Deferred = require_Deferred();
    var ResourceLoan = class extends Deferred {
      constructor(pooledResource, Promise2) {
        super(Promise2);
        this._creationTimestamp = Date.now();
        this.pooledResource = pooledResource;
      }
      reject() {
      }
    };
    module2.exports = ResourceLoan;
  }
});

// node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/PooledResourceStateEnum.js
var require_PooledResourceStateEnum = __commonJS({
  "node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/PooledResourceStateEnum.js"(exports, module2) {
    "use strict";
    var PooledResourceStateEnum = {
      ALLOCATED: "ALLOCATED",
      IDLE: "IDLE",
      INVALID: "INVALID",
      RETURNING: "RETURNING",
      VALIDATION: "VALIDATION"
    };
    module2.exports = PooledResourceStateEnum;
  }
});

// node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/PooledResource.js
var require_PooledResource = __commonJS({
  "node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/PooledResource.js"(exports, module2) {
    "use strict";
    var PooledResourceStateEnum = require_PooledResourceStateEnum();
    var PooledResource = class {
      constructor(resource) {
        this.creationTime = Date.now();
        this.lastReturnTime = null;
        this.lastBorrowTime = null;
        this.lastIdleTime = null;
        this.obj = resource;
        this.state = PooledResourceStateEnum.IDLE;
      }
      allocate() {
        this.lastBorrowTime = Date.now();
        this.state = PooledResourceStateEnum.ALLOCATED;
      }
      deallocate() {
        this.lastReturnTime = Date.now();
        this.state = PooledResourceStateEnum.IDLE;
      }
      invalidate() {
        this.state = PooledResourceStateEnum.INVALID;
      }
      test() {
        this.state = PooledResourceStateEnum.VALIDATION;
      }
      idle() {
        this.lastIdleTime = Date.now();
        this.state = PooledResourceStateEnum.IDLE;
      }
      returning() {
        this.state = PooledResourceStateEnum.RETURNING;
      }
    };
    module2.exports = PooledResource;
  }
});

// node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/DefaultEvictor.js
var require_DefaultEvictor = __commonJS({
  "node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/DefaultEvictor.js"(exports, module2) {
    "use strict";
    var DefaultEvictor = class {
      evict(config, pooledResource, availableObjectsCount) {
        const idleTime = Date.now() - pooledResource.lastIdleTime;
        if (config.softIdleTimeoutMillis > 0 && config.softIdleTimeoutMillis < idleTime && config.min < availableObjectsCount) {
          return true;
        }
        if (config.idleTimeoutMillis < idleTime) {
          return true;
        }
        return false;
      }
    };
    module2.exports = DefaultEvictor;
  }
});

// node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/DoublyLinkedList.js
var require_DoublyLinkedList = __commonJS({
  "node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/DoublyLinkedList.js"(exports, module2) {
    "use strict";
    var DoublyLinkedList = class {
      constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      insertBeginning(node) {
        if (this.head === null) {
          this.head = node;
          this.tail = node;
          node.prev = null;
          node.next = null;
          this.length++;
        } else {
          this.insertBefore(this.head, node);
        }
      }
      insertEnd(node) {
        if (this.tail === null) {
          this.insertBeginning(node);
        } else {
          this.insertAfter(this.tail, node);
        }
      }
      insertAfter(node, newNode) {
        newNode.prev = node;
        newNode.next = node.next;
        if (node.next === null) {
          this.tail = newNode;
        } else {
          node.next.prev = newNode;
        }
        node.next = newNode;
        this.length++;
      }
      insertBefore(node, newNode) {
        newNode.prev = node.prev;
        newNode.next = node;
        if (node.prev === null) {
          this.head = newNode;
        } else {
          node.prev.next = newNode;
        }
        node.prev = newNode;
        this.length++;
      }
      remove(node) {
        if (node.prev === null) {
          this.head = node.next;
        } else {
          node.prev.next = node.next;
        }
        if (node.next === null) {
          this.tail = node.prev;
        } else {
          node.next.prev = node.prev;
        }
        node.prev = null;
        node.next = null;
        this.length--;
      }
      static createNode(data) {
        return {
          prev: null,
          next: null,
          data
        };
      }
    };
    module2.exports = DoublyLinkedList;
  }
});

// node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/DoublyLinkedListIterator.js
var require_DoublyLinkedListIterator = __commonJS({
  "node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/DoublyLinkedListIterator.js"(exports, module2) {
    "use strict";
    var DoublyLinkedListIterator = class {
      constructor(doublyLinkedList, reverse) {
        this._list = doublyLinkedList;
        this._direction = reverse === true ? "prev" : "next";
        this._startPosition = reverse === true ? "tail" : "head";
        this._started = false;
        this._cursor = null;
        this._done = false;
      }
      _start() {
        this._cursor = this._list[this._startPosition];
        this._started = true;
      }
      _advanceCursor() {
        if (this._started === false) {
          this._started = true;
          this._cursor = this._list[this._startPosition];
          return;
        }
        this._cursor = this._cursor[this._direction];
      }
      reset() {
        this._done = false;
        this._started = false;
        this._cursor = null;
      }
      remove() {
        if (this._started === false || this._done === true || this._isCursorDetached()) {
          return false;
        }
        this._list.remove(this._cursor);
      }
      next() {
        if (this._done === true) {
          return { done: true };
        }
        this._advanceCursor();
        if (this._cursor === null || this._isCursorDetached()) {
          this._done = true;
          return { done: true };
        }
        return {
          value: this._cursor,
          done: false
        };
      }
      _isCursorDetached() {
        return this._cursor.prev === null && this._cursor.next === null && this._list.tail !== this._cursor && this._list.head !== this._cursor;
      }
    };
    module2.exports = DoublyLinkedListIterator;
  }
});

// node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/DequeIterator.js
var require_DequeIterator = __commonJS({
  "node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/DequeIterator.js"(exports, module2) {
    "use strict";
    var DoublyLinkedListIterator = require_DoublyLinkedListIterator();
    var DequeIterator = class extends DoublyLinkedListIterator {
      next() {
        const result = super.next();
        if (result.value) {
          result.value = result.value.data;
        }
        return result;
      }
    };
    module2.exports = DequeIterator;
  }
});

// node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/Deque.js
var require_Deque = __commonJS({
  "node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/Deque.js"(exports, module2) {
    "use strict";
    var DoublyLinkedList = require_DoublyLinkedList();
    var DequeIterator = require_DequeIterator();
    var Deque = class {
      constructor() {
        this._list = new DoublyLinkedList();
      }
      shift() {
        if (this.length === 0) {
          return void 0;
        }
        const node = this._list.head;
        this._list.remove(node);
        return node.data;
      }
      unshift(element) {
        const node = DoublyLinkedList.createNode(element);
        this._list.insertBeginning(node);
      }
      push(element) {
        const node = DoublyLinkedList.createNode(element);
        this._list.insertEnd(node);
      }
      pop() {
        if (this.length === 0) {
          return void 0;
        }
        const node = this._list.tail;
        this._list.remove(node);
        return node.data;
      }
      [Symbol.iterator]() {
        return new DequeIterator(this._list);
      }
      iterator() {
        return new DequeIterator(this._list);
      }
      reverseIterator() {
        return new DequeIterator(this._list, true);
      }
      get head() {
        if (this.length === 0) {
          return void 0;
        }
        const node = this._list.head;
        return node.data;
      }
      get tail() {
        if (this.length === 0) {
          return void 0;
        }
        const node = this._list.tail;
        return node.data;
      }
      get length() {
        return this._list.length;
      }
    };
    module2.exports = Deque;
  }
});

// node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/Queue.js
var require_Queue = __commonJS({
  "node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/Queue.js"(exports, module2) {
    "use strict";
    var DoublyLinkedList = require_DoublyLinkedList();
    var Deque = require_Deque();
    var Queue = class extends Deque {
      push(resourceRequest) {
        const node = DoublyLinkedList.createNode(resourceRequest);
        resourceRequest.promise.catch(this._createTimeoutRejectionHandler(node));
        this._list.insertEnd(node);
      }
      _createTimeoutRejectionHandler(node) {
        return (reason) => {
          if (reason.name === "TimeoutError") {
            this._list.remove(node);
          }
        };
      }
    };
    module2.exports = Queue;
  }
});

// node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/PriorityQueue.js
var require_PriorityQueue = __commonJS({
  "node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/PriorityQueue.js"(exports, module2) {
    "use strict";
    var Queue = require_Queue();
    var PriorityQueue = class {
      constructor(size) {
        this._size = Math.max(+size | 0, 1);
        this._slots = [];
        for (let i2 = 0; i2 < this._size; i2++) {
          this._slots.push(new Queue());
        }
      }
      get length() {
        let _length = 0;
        for (let i2 = 0, slots = this._slots.length; i2 < slots; i2++) {
          _length += this._slots[i2].length;
        }
        return _length;
      }
      enqueue(obj, priority) {
        priority = priority && +priority | 0 || 0;
        if (priority) {
          if (priority < 0 || priority >= this._size) {
            priority = this._size - 1;
          }
        }
        this._slots[priority].push(obj);
      }
      dequeue() {
        for (let i2 = 0, sl = this._slots.length; i2 < sl; i2 += 1) {
          if (this._slots[i2].length) {
            return this._slots[i2].shift();
          }
        }
        return;
      }
      get head() {
        for (let i2 = 0, sl = this._slots.length; i2 < sl; i2 += 1) {
          if (this._slots[i2].length > 0) {
            return this._slots[i2].head;
          }
        }
        return;
      }
      get tail() {
        for (let i2 = this._slots.length - 1; i2 >= 0; i2--) {
          if (this._slots[i2].length > 0) {
            return this._slots[i2].tail;
          }
        }
        return;
      }
    };
    module2.exports = PriorityQueue;
  }
});

// node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/utils.js
var require_utils2 = __commonJS({
  "node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/utils.js"(exports) {
    "use strict";
    function noop3() {
    }
    exports.reflector = function(promise) {
      return promise.then(noop3, noop3);
    };
  }
});

// node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/Pool.js
var require_Pool = __commonJS({
  "node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/lib/Pool.js"(exports, module2) {
    "use strict";
    var EventEmitter = require("events").EventEmitter;
    var factoryValidator = require_factoryValidator();
    var PoolOptions = require_PoolOptions();
    var ResourceRequest = require_ResourceRequest();
    var ResourceLoan = require_ResourceLoan();
    var PooledResource = require_PooledResource();
    var DefaultEvictor = require_DefaultEvictor();
    var Deque = require_Deque();
    var Deferred = require_Deferred();
    var PriorityQueue = require_PriorityQueue();
    var DequeIterator = require_DequeIterator();
    var reflector = require_utils2().reflector;
    var FACTORY_CREATE_ERROR = "factoryCreateError";
    var FACTORY_DESTROY_ERROR = "factoryDestroyError";
    var Pool = class extends EventEmitter {
      constructor(Evictor, Deque2, PriorityQueue2, factory, options) {
        super();
        factoryValidator(factory);
        this._config = new PoolOptions(options);
        this._Promise = this._config.Promise;
        this._factory = factory;
        this._draining = false;
        this._started = false;
        this._waitingClientsQueue = new PriorityQueue2(this._config.priorityRange);
        this._factoryCreateOperations = /* @__PURE__ */ new Set();
        this._factoryDestroyOperations = /* @__PURE__ */ new Set();
        this._availableObjects = new Deque2();
        this._testOnBorrowResources = /* @__PURE__ */ new Set();
        this._testOnReturnResources = /* @__PURE__ */ new Set();
        this._validationOperations = /* @__PURE__ */ new Set();
        this._allObjects = /* @__PURE__ */ new Set();
        this._resourceLoans = /* @__PURE__ */ new Map();
        this._evictionIterator = this._availableObjects.iterator();
        this._evictor = new Evictor();
        this._scheduledEviction = null;
        if (this._config.autostart === true) {
          this.start();
        }
      }
      _destroy(pooledResource) {
        pooledResource.invalidate();
        this._allObjects.delete(pooledResource);
        const destroyPromise = this._factory.destroy(pooledResource.obj);
        const wrappedDestroyPromise = this._config.destroyTimeoutMillis ? this._Promise.resolve(this._applyDestroyTimeout(destroyPromise)) : this._Promise.resolve(destroyPromise);
        this._trackOperation(wrappedDestroyPromise, this._factoryDestroyOperations).catch((reason) => {
          this.emit(FACTORY_DESTROY_ERROR, reason);
        });
        this._ensureMinimum();
      }
      _applyDestroyTimeout(promise) {
        const timeoutPromise = new this._Promise((resolve2, reject) => {
          setTimeout(() => {
            reject(new Error("destroy timed out"));
          }, this._config.destroyTimeoutMillis).unref();
        });
        return this._Promise.race([timeoutPromise, promise]);
      }
      _testOnBorrow() {
        if (this._availableObjects.length < 1) {
          return false;
        }
        const pooledResource = this._availableObjects.shift();
        pooledResource.test();
        this._testOnBorrowResources.add(pooledResource);
        const validationPromise = this._factory.validate(pooledResource.obj);
        const wrappedValidationPromise = this._Promise.resolve(validationPromise);
        this._trackOperation(wrappedValidationPromise, this._validationOperations).then((isValid) => {
          this._testOnBorrowResources.delete(pooledResource);
          if (isValid === false) {
            pooledResource.invalidate();
            this._destroy(pooledResource);
            this._dispense();
            return;
          }
          this._dispatchPooledResourceToNextWaitingClient(pooledResource);
        });
        return true;
      }
      _dispatchResource() {
        if (this._availableObjects.length < 1) {
          return false;
        }
        const pooledResource = this._availableObjects.shift();
        this._dispatchPooledResourceToNextWaitingClient(pooledResource);
        return false;
      }
      _dispense() {
        const numWaitingClients = this._waitingClientsQueue.length;
        if (numWaitingClients < 1) {
          return;
        }
        const resourceShortfall = numWaitingClients - this._potentiallyAllocableResourceCount;
        const actualNumberOfResourcesToCreate = Math.min(this.spareResourceCapacity, resourceShortfall);
        for (let i2 = 0; actualNumberOfResourcesToCreate > i2; i2++) {
          this._createResource();
        }
        if (this._config.testOnBorrow === true) {
          const desiredNumberOfResourcesToMoveIntoTest = numWaitingClients - this._testOnBorrowResources.size;
          const actualNumberOfResourcesToMoveIntoTest = Math.min(this._availableObjects.length, desiredNumberOfResourcesToMoveIntoTest);
          for (let i2 = 0; actualNumberOfResourcesToMoveIntoTest > i2; i2++) {
            this._testOnBorrow();
          }
        }
        if (this._config.testOnBorrow === false) {
          const actualNumberOfResourcesToDispatch = Math.min(this._availableObjects.length, numWaitingClients);
          for (let i2 = 0; actualNumberOfResourcesToDispatch > i2; i2++) {
            this._dispatchResource();
          }
        }
      }
      _dispatchPooledResourceToNextWaitingClient(pooledResource) {
        const clientResourceRequest = this._waitingClientsQueue.dequeue();
        if (clientResourceRequest === void 0 || clientResourceRequest.state !== Deferred.PENDING) {
          this._addPooledResourceToAvailableObjects(pooledResource);
          return false;
        }
        const loan = new ResourceLoan(pooledResource, this._Promise);
        this._resourceLoans.set(pooledResource.obj, loan);
        pooledResource.allocate();
        clientResourceRequest.resolve(pooledResource.obj);
        return true;
      }
      _trackOperation(operation, set) {
        set.add(operation);
        return operation.then((v) => {
          set.delete(operation);
          return this._Promise.resolve(v);
        }, (e2) => {
          set.delete(operation);
          return this._Promise.reject(e2);
        });
      }
      _createResource() {
        const factoryPromise = this._factory.create();
        const wrappedFactoryPromise = this._Promise.resolve(factoryPromise).then((resource) => {
          const pooledResource = new PooledResource(resource);
          this._allObjects.add(pooledResource);
          this._addPooledResourceToAvailableObjects(pooledResource);
        });
        this._trackOperation(wrappedFactoryPromise, this._factoryCreateOperations).then(() => {
          this._dispense();
          return null;
        }).catch((reason) => {
          this.emit(FACTORY_CREATE_ERROR, reason);
          this._dispense();
        });
      }
      _ensureMinimum() {
        if (this._draining === true) {
          return;
        }
        const minShortfall = this._config.min - this._count;
        for (let i2 = 0; i2 < minShortfall; i2++) {
          this._createResource();
        }
      }
      _evict() {
        const testsToRun = Math.min(this._config.numTestsPerEvictionRun, this._availableObjects.length);
        const evictionConfig = {
          softIdleTimeoutMillis: this._config.softIdleTimeoutMillis,
          idleTimeoutMillis: this._config.idleTimeoutMillis,
          min: this._config.min
        };
        for (let testsHaveRun = 0; testsHaveRun < testsToRun; ) {
          const iterationResult = this._evictionIterator.next();
          if (iterationResult.done === true && this._availableObjects.length < 1) {
            this._evictionIterator.reset();
            return;
          }
          if (iterationResult.done === true && this._availableObjects.length > 0) {
            this._evictionIterator.reset();
            continue;
          }
          const resource = iterationResult.value;
          const shouldEvict = this._evictor.evict(evictionConfig, resource, this._availableObjects.length);
          testsHaveRun++;
          if (shouldEvict === true) {
            this._evictionIterator.remove();
            this._destroy(resource);
          }
        }
      }
      _scheduleEvictorRun() {
        if (this._config.evictionRunIntervalMillis > 0) {
          this._scheduledEviction = setTimeout(() => {
            this._evict();
            this._scheduleEvictorRun();
          }, this._config.evictionRunIntervalMillis);
        }
      }
      _descheduleEvictorRun() {
        if (this._scheduledEviction) {
          clearTimeout(this._scheduledEviction);
        }
        this._scheduledEviction = null;
      }
      start() {
        if (this._draining === true) {
          return;
        }
        if (this._started === true) {
          return;
        }
        this._started = true;
        this._scheduleEvictorRun();
        this._ensureMinimum();
      }
      acquire(priority) {
        if (this._started === false && this._config.autostart === false) {
          this.start();
        }
        if (this._draining) {
          return this._Promise.reject(new Error("pool is draining and cannot accept work"));
        }
        if (this.spareResourceCapacity < 1 && this._availableObjects.length < 1 && this._config.maxWaitingClients !== void 0 && this._waitingClientsQueue.length >= this._config.maxWaitingClients) {
          return this._Promise.reject(new Error("max waitingClients count exceeded"));
        }
        const resourceRequest = new ResourceRequest(this._config.acquireTimeoutMillis, this._Promise);
        this._waitingClientsQueue.enqueue(resourceRequest, priority);
        this._dispense();
        return resourceRequest.promise;
      }
      use(fn, priority) {
        return this.acquire(priority).then((resource) => {
          return fn(resource).then((result) => {
            this.release(resource);
            return result;
          }, (err) => {
            this.destroy(resource);
            throw err;
          });
        });
      }
      isBorrowedResource(resource) {
        return this._resourceLoans.has(resource);
      }
      release(resource) {
        const loan = this._resourceLoans.get(resource);
        if (loan === void 0) {
          return this._Promise.reject(new Error("Resource not currently part of this pool"));
        }
        this._resourceLoans.delete(resource);
        loan.resolve();
        const pooledResource = loan.pooledResource;
        pooledResource.deallocate();
        this._addPooledResourceToAvailableObjects(pooledResource);
        this._dispense();
        return this._Promise.resolve();
      }
      destroy(resource) {
        const loan = this._resourceLoans.get(resource);
        if (loan === void 0) {
          return this._Promise.reject(new Error("Resource not currently part of this pool"));
        }
        this._resourceLoans.delete(resource);
        loan.resolve();
        const pooledResource = loan.pooledResource;
        pooledResource.deallocate();
        this._destroy(pooledResource);
        this._dispense();
        return this._Promise.resolve();
      }
      _addPooledResourceToAvailableObjects(pooledResource) {
        pooledResource.idle();
        if (this._config.fifo === true) {
          this._availableObjects.push(pooledResource);
        } else {
          this._availableObjects.unshift(pooledResource);
        }
      }
      drain() {
        this._draining = true;
        return this.__allResourceRequestsSettled().then(() => {
          return this.__allResourcesReturned();
        }).then(() => {
          this._descheduleEvictorRun();
        });
      }
      __allResourceRequestsSettled() {
        if (this._waitingClientsQueue.length > 0) {
          return reflector(this._waitingClientsQueue.tail.promise);
        }
        return this._Promise.resolve();
      }
      __allResourcesReturned() {
        const ps = Array.from(this._resourceLoans.values()).map((loan) => loan.promise).map(reflector);
        return this._Promise.all(ps);
      }
      clear() {
        const reflectedCreatePromises = Array.from(this._factoryCreateOperations).map(reflector);
        return this._Promise.all(reflectedCreatePromises).then(() => {
          for (const resource of this._availableObjects) {
            this._destroy(resource);
          }
          const reflectedDestroyPromises = Array.from(this._factoryDestroyOperations).map(reflector);
          return reflector(this._Promise.all(reflectedDestroyPromises));
        });
      }
      ready() {
        return new this._Promise((resolve2) => {
          const isReady = () => {
            if (this.available >= this.min) {
              resolve2();
            } else {
              setTimeout(isReady, 100);
            }
          };
          isReady();
        });
      }
      get _potentiallyAllocableResourceCount() {
        return this._availableObjects.length + this._testOnBorrowResources.size + this._testOnReturnResources.size + this._factoryCreateOperations.size;
      }
      get _count() {
        return this._allObjects.size + this._factoryCreateOperations.size;
      }
      get spareResourceCapacity() {
        return this._config.max - (this._allObjects.size + this._factoryCreateOperations.size);
      }
      get size() {
        return this._count;
      }
      get available() {
        return this._availableObjects.length;
      }
      get borrowed() {
        return this._resourceLoans.size;
      }
      get pending() {
        return this._waitingClientsQueue.length;
      }
      get max() {
        return this._config.max;
      }
      get min() {
        return this._config.min;
      }
    };
    module2.exports = Pool;
  }
});

// node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/index.js
var require_generic_pool = __commonJS({
  "node_modules/.pnpm/generic-pool@3.8.2/node_modules/generic-pool/index.js"(exports, module2) {
    var Pool = require_Pool();
    var Deque = require_Deque();
    var PriorityQueue = require_PriorityQueue();
    var DefaultEvictor = require_DefaultEvictor();
    module2.exports = {
      Pool,
      Deque,
      PriorityQueue,
      DefaultEvictor,
      createPool: function(factory, config) {
        return new Pool(DefaultEvictor, Deque, PriorityQueue, factory, config);
      }
    };
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/client/index.js
var require_client = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/client/index.js"(exports) {
    "use strict";
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f3) {
      if (kind === "a" && !f3)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f3 : kind === "a" ? f3.call(receiver) : f3 ? f3.value : state.get(receiver);
    };
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f3) {
      if (kind === "m")
        throw new TypeError("Private method is not writable");
      if (kind === "a" && !f3)
        throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
        throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f3.call(receiver, value) : f3 ? f3.value = value : state.set(receiver, value), value;
    };
    var _RedisClient_instances;
    var _RedisClient_options;
    var _RedisClient_socket;
    var _RedisClient_queue;
    var _RedisClient_isolationPool;
    var _RedisClient_v4;
    var _RedisClient_selectedDB;
    var _RedisClient_initiateOptions;
    var _RedisClient_initiateSocket;
    var _RedisClient_initiateQueue;
    var _RedisClient_legacyMode;
    var _RedisClient_defineLegacyCommand;
    var _RedisClient_sendCommand;
    var _RedisClient_subscribe;
    var _RedisClient_unsubscribe;
    var _RedisClient_tick;
    var _RedisClient_destroyIsolationPool;
    Object.defineProperty(exports, "__esModule", { value: true });
    var commands_1 = require_commands2();
    var socket_1 = require_socket();
    var commands_queue_1 = require_commands_queue();
    var multi_command_1 = require_multi_command2();
    var events_1 = require("events");
    var command_options_1 = require_command_options();
    var commander_1 = require_commander();
    var generic_pool_1 = require_generic_pool();
    var errors_1 = require_errors();
    var url_1 = require("url");
    var RedisClient = class extends events_1.EventEmitter {
      constructor(options) {
        super();
        _RedisClient_instances.add(this);
        Object.defineProperty(this, "commandOptions", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: RedisClient.commandOptions
        });
        _RedisClient_options.set(this, void 0);
        _RedisClient_socket.set(this, void 0);
        _RedisClient_queue.set(this, void 0);
        _RedisClient_isolationPool.set(this, void 0);
        _RedisClient_v4.set(this, {});
        _RedisClient_selectedDB.set(this, 0);
        Object.defineProperty(this, "select", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: this.SELECT
        });
        Object.defineProperty(this, "subscribe", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: this.SUBSCRIBE
        });
        Object.defineProperty(this, "pSubscribe", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: this.PSUBSCRIBE
        });
        Object.defineProperty(this, "unsubscribe", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: this.UNSUBSCRIBE
        });
        Object.defineProperty(this, "pUnsubscribe", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: this.PUNSUBSCRIBE
        });
        Object.defineProperty(this, "quit", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: this.QUIT
        });
        __classPrivateFieldSet(this, _RedisClient_options, __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_initiateOptions).call(this, options), "f");
        __classPrivateFieldSet(this, _RedisClient_socket, __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_initiateSocket).call(this), "f");
        __classPrivateFieldSet(this, _RedisClient_queue, __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_initiateQueue).call(this), "f");
        __classPrivateFieldSet(this, _RedisClient_isolationPool, (0, generic_pool_1.createPool)({
          create: async () => {
            const duplicate = this.duplicate({
              isolationPoolOptions: void 0
            });
            await duplicate.connect();
            return duplicate;
          },
          destroy: (client2) => client2.disconnect()
        }, options === null || options === void 0 ? void 0 : options.isolationPoolOptions), "f");
        __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_legacyMode).call(this);
      }
      static commandOptions(options) {
        return (0, command_options_1.commandOptions)(options);
      }
      static extend(plugins) {
        const Client2 = (0, commander_1.extendWithModulesAndScripts)({
          BaseClass: RedisClient,
          modules: plugins === null || plugins === void 0 ? void 0 : plugins.modules,
          modulesCommandsExecutor: RedisClient.prototype.commandsExecutor,
          scripts: plugins === null || plugins === void 0 ? void 0 : plugins.scripts,
          scriptsExecutor: RedisClient.prototype.scriptsExecutor
        });
        if (Client2 !== RedisClient) {
          Client2.prototype.Multi = multi_command_1.default.extend(plugins);
        }
        return Client2;
      }
      static create(options) {
        return new (RedisClient.extend(options))(options);
      }
      static parseURL(url) {
        const { hostname, port, protocol, username, password, pathname } = new url_1.URL(url), parsed = {
          socket: {
            host: hostname
          }
        };
        if (protocol === "rediss:") {
          parsed.socket.tls = true;
        } else if (protocol !== "redis:") {
          throw new TypeError("Invalid protocol");
        }
        if (port) {
          parsed.socket.port = Number(port);
        }
        if (username) {
          parsed.username = decodeURIComponent(username);
        }
        if (password) {
          parsed.password = decodeURIComponent(password);
        }
        if (pathname.length > 1) {
          const database = Number(pathname.substring(1));
          if (isNaN(database)) {
            throw new TypeError("Invalid pathname");
          }
          parsed.database = database;
        }
        return parsed;
      }
      get options() {
        return __classPrivateFieldGet(this, _RedisClient_options, "f");
      }
      get isOpen() {
        return __classPrivateFieldGet(this, _RedisClient_socket, "f").isOpen;
      }
      get v4() {
        var _a4;
        if (!((_a4 = __classPrivateFieldGet(this, _RedisClient_options, "f")) === null || _a4 === void 0 ? void 0 : _a4.legacyMode)) {
          throw new Error('the client is not in "legacy mode"');
        }
        return __classPrivateFieldGet(this, _RedisClient_v4, "f");
      }
      duplicate(overrides) {
        return new (Object.getPrototypeOf(this)).constructor(__spreadValues(__spreadValues({}, __classPrivateFieldGet(this, _RedisClient_options, "f")), overrides));
      }
      async connect() {
        await __classPrivateFieldGet(this, _RedisClient_socket, "f").connect();
      }
      async commandsExecutor(command, args) {
        const { args: redisArgs, options } = (0, commander_1.transformCommandArguments)(command, args);
        return (0, commander_1.transformCommandReply)(command, await __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, redisArgs, options), redisArgs.preserve);
      }
      sendCommand(args, options) {
        return __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, args, options);
      }
      async scriptsExecutor(script, args) {
        const { args: redisArgs, options } = (0, commander_1.transformCommandArguments)(script, args);
        return (0, commander_1.transformCommandReply)(script, await this.executeScript(script, redisArgs, options), redisArgs.preserve);
      }
      async executeScript(script, args, options) {
        var _a4, _b;
        try {
          return await __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, [
            "EVALSHA",
            script.SHA1,
            script.NUMBER_OF_KEYS.toString(),
            ...args
          ], options);
        } catch (err) {
          if (!((_b = (_a4 = err === null || err === void 0 ? void 0 : err.message) === null || _a4 === void 0 ? void 0 : _a4.startsWith) === null || _b === void 0 ? void 0 : _b.call(_a4, "NOSCRIPT"))) {
            throw err;
          }
          return await __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, [
            "EVAL",
            script.SCRIPT,
            script.NUMBER_OF_KEYS.toString(),
            ...args
          ], options);
        }
      }
      async SELECT(options, db) {
        if (!(0, command_options_1.isCommandOptions)(options)) {
          db = options;
          options = null;
        }
        await __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, ["SELECT", db.toString()], options);
        __classPrivateFieldSet(this, _RedisClient_selectedDB, db, "f");
      }
      SUBSCRIBE(channels, listener, bufferMode) {
        return __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_subscribe).call(this, commands_queue_1.PubSubSubscribeCommands.SUBSCRIBE, channels, listener, bufferMode);
      }
      PSUBSCRIBE(patterns, listener, bufferMode) {
        return __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_subscribe).call(this, commands_queue_1.PubSubSubscribeCommands.PSUBSCRIBE, patterns, listener, bufferMode);
      }
      UNSUBSCRIBE(channels, listener, bufferMode) {
        return __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_unsubscribe).call(this, commands_queue_1.PubSubUnsubscribeCommands.UNSUBSCRIBE, channels, listener, bufferMode);
      }
      PUNSUBSCRIBE(patterns, listener, bufferMode) {
        return __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_unsubscribe).call(this, commands_queue_1.PubSubUnsubscribeCommands.PUNSUBSCRIBE, patterns, listener, bufferMode);
      }
      QUIT() {
        return __classPrivateFieldGet(this, _RedisClient_socket, "f").quit(() => {
          const quitPromise = __classPrivateFieldGet(this, _RedisClient_queue, "f").addCommand(["QUIT"], {
            ignorePubSubMode: true
          });
          __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_tick).call(this);
          return Promise.all([
            quitPromise,
            __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_destroyIsolationPool).call(this)
          ]);
        });
      }
      executeIsolated(fn) {
        return __classPrivateFieldGet(this, _RedisClient_isolationPool, "f").use(fn);
      }
      multi() {
        var _a4;
        return new this.Multi(this.multiExecutor.bind(this), (_a4 = __classPrivateFieldGet(this, _RedisClient_options, "f")) === null || _a4 === void 0 ? void 0 : _a4.legacyMode);
      }
      multiExecutor(commands, chainId) {
        const promise = Promise.all(commands.map(({ args }) => {
          return __classPrivateFieldGet(this, _RedisClient_queue, "f").addCommand(args, RedisClient.commandOptions({
            chainId
          }));
        }));
        __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_tick).call(this);
        return promise;
      }
      async *scanIterator(options) {
        let cursor = 0;
        do {
          const reply = await this.scan(cursor, options);
          cursor = reply.cursor;
          for (const key2 of reply.keys) {
            yield key2;
          }
        } while (cursor !== 0);
      }
      async *hScanIterator(key2, options) {
        let cursor = 0;
        do {
          const reply = await this.hScan(key2, cursor, options);
          cursor = reply.cursor;
          for (const tuple of reply.tuples) {
            yield tuple;
          }
        } while (cursor !== 0);
      }
      async *sScanIterator(key2, options) {
        let cursor = 0;
        do {
          const reply = await this.sScan(key2, cursor, options);
          cursor = reply.cursor;
          for (const member of reply.members) {
            yield member;
          }
        } while (cursor !== 0);
      }
      async *zScanIterator(key2, options) {
        let cursor = 0;
        do {
          const reply = await this.zScan(key2, cursor, options);
          cursor = reply.cursor;
          for (const member of reply.members) {
            yield member;
          }
        } while (cursor !== 0);
      }
      async disconnect() {
        __classPrivateFieldGet(this, _RedisClient_queue, "f").flushAll(new errors_1.DisconnectsClientError());
        __classPrivateFieldGet(this, _RedisClient_socket, "f").disconnect();
        await __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_destroyIsolationPool).call(this);
      }
    };
    exports.default = RedisClient;
    _RedisClient_options = /* @__PURE__ */ new WeakMap(), _RedisClient_socket = /* @__PURE__ */ new WeakMap(), _RedisClient_queue = /* @__PURE__ */ new WeakMap(), _RedisClient_isolationPool = /* @__PURE__ */ new WeakMap(), _RedisClient_v4 = /* @__PURE__ */ new WeakMap(), _RedisClient_selectedDB = /* @__PURE__ */ new WeakMap(), _RedisClient_instances = /* @__PURE__ */ new WeakSet(), _RedisClient_initiateOptions = function _RedisClient_initiateOptions2(options) {
      if (options === null || options === void 0 ? void 0 : options.url) {
        const parsed = RedisClient.parseURL(options.url);
        if (options.socket) {
          parsed.socket = Object.assign(options.socket, parsed.socket);
        }
        Object.assign(options, parsed);
      }
      if (options === null || options === void 0 ? void 0 : options.database) {
        __classPrivateFieldSet(this, _RedisClient_selectedDB, options.database, "f");
      }
      return options;
    }, _RedisClient_initiateSocket = function _RedisClient_initiateSocket2() {
      var _a4;
      const socketInitiator = async () => {
        var _a5, _b, _c, _d2, _e;
        const promises = [];
        if (__classPrivateFieldGet(this, _RedisClient_selectedDB, "f") !== 0) {
          promises.push(__classPrivateFieldGet(this, _RedisClient_queue, "f").addCommand(["SELECT", __classPrivateFieldGet(this, _RedisClient_selectedDB, "f").toString()], { asap: true }));
        }
        if ((_a5 = __classPrivateFieldGet(this, _RedisClient_options, "f")) === null || _a5 === void 0 ? void 0 : _a5.readonly) {
          promises.push(__classPrivateFieldGet(this, _RedisClient_queue, "f").addCommand(commands_1.default.READONLY.transformArguments(), { asap: true }));
        }
        if ((_b = __classPrivateFieldGet(this, _RedisClient_options, "f")) === null || _b === void 0 ? void 0 : _b.name) {
          promises.push(__classPrivateFieldGet(this, _RedisClient_queue, "f").addCommand(commands_1.default.CLIENT_SETNAME.transformArguments(__classPrivateFieldGet(this, _RedisClient_options, "f").name), { asap: true }));
        }
        if (((_c = __classPrivateFieldGet(this, _RedisClient_options, "f")) === null || _c === void 0 ? void 0 : _c.username) || ((_d2 = __classPrivateFieldGet(this, _RedisClient_options, "f")) === null || _d2 === void 0 ? void 0 : _d2.password)) {
          promises.push(__classPrivateFieldGet(this, _RedisClient_queue, "f").addCommand(commands_1.default.AUTH.transformArguments({
            username: __classPrivateFieldGet(this, _RedisClient_options, "f").username,
            password: (_e = __classPrivateFieldGet(this, _RedisClient_options, "f").password) !== null && _e !== void 0 ? _e : ""
          }), { asap: true }).catch((err) => {
            throw new errors_1.AuthError(err.message);
          }));
        }
        const resubscribePromise = __classPrivateFieldGet(this, _RedisClient_queue, "f").resubscribe();
        if (resubscribePromise) {
          promises.push(resubscribePromise);
        }
        if (promises.length) {
          __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_tick).call(this, true);
          await Promise.all(promises);
        }
      };
      return new socket_1.default(socketInitiator, (_a4 = __classPrivateFieldGet(this, _RedisClient_options, "f")) === null || _a4 === void 0 ? void 0 : _a4.socket).on("data", (data) => __classPrivateFieldGet(this, _RedisClient_queue, "f").parseResponse(data)).on("error", (err) => {
        var _a5;
        this.emit("error", err);
        if (__classPrivateFieldGet(this, _RedisClient_socket, "f").isOpen && !((_a5 = __classPrivateFieldGet(this, _RedisClient_options, "f")) === null || _a5 === void 0 ? void 0 : _a5.disableOfflineQueue)) {
          __classPrivateFieldGet(this, _RedisClient_queue, "f").flushWaitingForReply(err);
        } else {
          __classPrivateFieldGet(this, _RedisClient_queue, "f").flushAll(err);
        }
      }).on("connect", () => this.emit("connect")).on("ready", () => {
        this.emit("ready");
        __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_tick).call(this);
      }).on("reconnecting", () => this.emit("reconnecting")).on("drain", () => __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_tick).call(this)).on("end", () => this.emit("end"));
    }, _RedisClient_initiateQueue = function _RedisClient_initiateQueue2() {
      var _a4;
      return new commands_queue_1.default((_a4 = __classPrivateFieldGet(this, _RedisClient_options, "f")) === null || _a4 === void 0 ? void 0 : _a4.commandsQueueMaxLength);
    }, _RedisClient_legacyMode = function _RedisClient_legacyMode2() {
      var _a4;
      if (!((_a4 = __classPrivateFieldGet(this, _RedisClient_options, "f")) === null || _a4 === void 0 ? void 0 : _a4.legacyMode))
        return;
      __classPrivateFieldGet(this, _RedisClient_v4, "f").sendCommand = __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_sendCommand).bind(this);
      this.sendCommand = (...args) => {
        let callback;
        if (typeof args[args.length - 1] === "function") {
          callback = args.pop();
        }
        __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, args.flat()).then((reply) => {
          if (!callback)
            return;
          callback(null, reply);
        }).catch((err) => {
          if (!callback) {
            this.emit("error", err);
            return;
          }
          callback(err);
        });
      };
      for (const name of Object.keys(commands_1.default)) {
        __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, name);
      }
      for (const name of Object.keys(commands_1.default)) {
        this[name.toLowerCase()] = this[name];
      }
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "SELECT");
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "select");
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "SUBSCRIBE");
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "subscribe");
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "PSUBSCRIBE");
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "pSubscribe");
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "UNSUBSCRIBE");
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "unsubscribe");
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "PUNSUBSCRIBE");
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "pUnsubscribe");
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "QUIT");
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "quit");
    }, _RedisClient_defineLegacyCommand = function _RedisClient_defineLegacyCommand2(name) {
      __classPrivateFieldGet(this, _RedisClient_v4, "f")[name] = this[name].bind(this);
      this[name] = (...args) => this.sendCommand(name, ...args);
    }, _RedisClient_sendCommand = function _RedisClient_sendCommand2(args, options) {
      if (!__classPrivateFieldGet(this, _RedisClient_socket, "f").isOpen) {
        return Promise.reject(new errors_1.ClientClosedError());
      }
      if (options === null || options === void 0 ? void 0 : options.isolated) {
        return this.executeIsolated((isolatedClient) => isolatedClient.sendCommand(args, __spreadProps(__spreadValues({}, options), {
          isolated: false
        })));
      }
      const promise = __classPrivateFieldGet(this, _RedisClient_queue, "f").addCommand(args, options);
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_tick).call(this);
      return promise;
    }, _RedisClient_subscribe = function _RedisClient_subscribe2(command, channels, listener, bufferMode) {
      const promise = __classPrivateFieldGet(this, _RedisClient_queue, "f").subscribe(command, channels, listener, bufferMode);
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_tick).call(this);
      return promise;
    }, _RedisClient_unsubscribe = function _RedisClient_unsubscribe2(command, channels, listener, bufferMode) {
      const promise = __classPrivateFieldGet(this, _RedisClient_queue, "f").unsubscribe(command, channels, listener, bufferMode);
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_tick).call(this);
      return promise;
    }, _RedisClient_tick = function _RedisClient_tick2(force = false) {
      if (__classPrivateFieldGet(this, _RedisClient_socket, "f").writableNeedDrain || !force && !__classPrivateFieldGet(this, _RedisClient_socket, "f").isReady) {
        return;
      }
      __classPrivateFieldGet(this, _RedisClient_socket, "f").cork();
      while (!__classPrivateFieldGet(this, _RedisClient_socket, "f").writableNeedDrain) {
        const args = __classPrivateFieldGet(this, _RedisClient_queue, "f").getCommandToSend();
        if (args === void 0)
          break;
        __classPrivateFieldGet(this, _RedisClient_socket, "f").writeCommand(args);
      }
    }, _RedisClient_destroyIsolationPool = async function _RedisClient_destroyIsolationPool2() {
      await __classPrivateFieldGet(this, _RedisClient_isolationPool, "f").drain();
      await __classPrivateFieldGet(this, _RedisClient_isolationPool, "f").clear();
    };
    (0, commander_1.extendWithCommands)({
      BaseClass: RedisClient,
      commands: commands_1.default,
      executor: RedisClient.prototype.commandsExecutor
    });
    RedisClient.prototype.Multi = multi_command_1.default;
  }
});

// node_modules/.pnpm/cluster-key-slot@1.1.0/node_modules/cluster-key-slot/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/cluster-key-slot@1.1.0/node_modules/cluster-key-slot/lib/index.js"(exports, module2) {
    var lookup = [
      0,
      4129,
      8258,
      12387,
      16516,
      20645,
      24774,
      28903,
      33032,
      37161,
      41290,
      45419,
      49548,
      53677,
      57806,
      61935,
      4657,
      528,
      12915,
      8786,
      21173,
      17044,
      29431,
      25302,
      37689,
      33560,
      45947,
      41818,
      54205,
      50076,
      62463,
      58334,
      9314,
      13379,
      1056,
      5121,
      25830,
      29895,
      17572,
      21637,
      42346,
      46411,
      34088,
      38153,
      58862,
      62927,
      50604,
      54669,
      13907,
      9842,
      5649,
      1584,
      30423,
      26358,
      22165,
      18100,
      46939,
      42874,
      38681,
      34616,
      63455,
      59390,
      55197,
      51132,
      18628,
      22757,
      26758,
      30887,
      2112,
      6241,
      10242,
      14371,
      51660,
      55789,
      59790,
      63919,
      35144,
      39273,
      43274,
      47403,
      23285,
      19156,
      31415,
      27286,
      6769,
      2640,
      14899,
      10770,
      56317,
      52188,
      64447,
      60318,
      39801,
      35672,
      47931,
      43802,
      27814,
      31879,
      19684,
      23749,
      11298,
      15363,
      3168,
      7233,
      60846,
      64911,
      52716,
      56781,
      44330,
      48395,
      36200,
      40265,
      32407,
      28342,
      24277,
      20212,
      15891,
      11826,
      7761,
      3696,
      65439,
      61374,
      57309,
      53244,
      48923,
      44858,
      40793,
      36728,
      37256,
      33193,
      45514,
      41451,
      53516,
      49453,
      61774,
      57711,
      4224,
      161,
      12482,
      8419,
      20484,
      16421,
      28742,
      24679,
      33721,
      37784,
      41979,
      46042,
      49981,
      54044,
      58239,
      62302,
      689,
      4752,
      8947,
      13010,
      16949,
      21012,
      25207,
      29270,
      46570,
      42443,
      38312,
      34185,
      62830,
      58703,
      54572,
      50445,
      13538,
      9411,
      5280,
      1153,
      29798,
      25671,
      21540,
      17413,
      42971,
      47098,
      34713,
      38840,
      59231,
      63358,
      50973,
      55100,
      9939,
      14066,
      1681,
      5808,
      26199,
      30326,
      17941,
      22068,
      55628,
      51565,
      63758,
      59695,
      39368,
      35305,
      47498,
      43435,
      22596,
      18533,
      30726,
      26663,
      6336,
      2273,
      14466,
      10403,
      52093,
      56156,
      60223,
      64286,
      35833,
      39896,
      43963,
      48026,
      19061,
      23124,
      27191,
      31254,
      2801,
      6864,
      10931,
      14994,
      64814,
      60687,
      56684,
      52557,
      48554,
      44427,
      40424,
      36297,
      31782,
      27655,
      23652,
      19525,
      15522,
      11395,
      7392,
      3265,
      61215,
      65342,
      53085,
      57212,
      44955,
      49082,
      36825,
      40952,
      28183,
      32310,
      20053,
      24180,
      11923,
      16050,
      3793,
      7920
    ];
    var toUTF8Array = function toUTF8Array2(str) {
      var char;
      var i2 = 0;
      var p = 0;
      var utf8 = [];
      var len = str.length;
      for (; i2 < len; i2++) {
        char = str.charCodeAt(i2);
        if (char < 128) {
          utf8[p++] = char;
        } else if (char < 2048) {
          utf8[p++] = char >> 6 | 192;
          utf8[p++] = char & 63 | 128;
        } else if ((char & 64512) === 55296 && i2 + 1 < str.length && (str.charCodeAt(i2 + 1) & 64512) === 56320) {
          char = 65536 + ((char & 1023) << 10) + (str.charCodeAt(++i2) & 1023);
          utf8[p++] = char >> 18 | 240;
          utf8[p++] = char >> 12 & 63 | 128;
          utf8[p++] = char >> 6 & 63 | 128;
          utf8[p++] = char & 63 | 128;
        } else {
          utf8[p++] = char >> 12 | 224;
          utf8[p++] = char >> 6 & 63 | 128;
          utf8[p++] = char & 63 | 128;
        }
      }
      return utf8;
    };
    var generate = module2.exports = function generate2(str) {
      var char;
      var i2 = 0;
      var start = -1;
      var result = 0;
      var resultHash = 0;
      var utf8 = typeof str === "string" ? toUTF8Array(str) : str;
      var len = utf8.length;
      while (i2 < len) {
        char = utf8[i2++];
        if (start === -1) {
          if (char === 123) {
            start = i2;
          }
        } else if (char !== 125) {
          resultHash = lookup[(char ^ resultHash >> 8) & 255] ^ resultHash << 8;
        } else if (i2 - 1 !== start) {
          return resultHash & 16383;
        }
        result = lookup[(char ^ result >> 8) & 255] ^ result << 8;
      }
      return result & 16383;
    };
    module2.exports.generateMulti = function generateMulti(keys) {
      var i2 = 1;
      var len = keys.length;
      var base2 = generate(keys[0]);
      while (i2 < len) {
        if (generate(keys[i2++]) !== base2)
          return -1;
      }
      return base2;
    };
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/cluster/cluster-slots.js
var require_cluster_slots = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/cluster/cluster-slots.js"(exports) {
    "use strict";
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f3) {
      if (kind === "m")
        throw new TypeError("Private method is not writable");
      if (kind === "a" && !f3)
        throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
        throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f3.call(receiver, value) : f3 ? f3.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f3) {
      if (kind === "a" && !f3)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f3 : kind === "a" ? f3.call(receiver) : f3 ? f3.value : state.get(receiver);
    };
    var _RedisClusterSlots_instances;
    var _RedisClusterSlots_options;
    var _RedisClusterSlots_Client;
    var _RedisClusterSlots_onError;
    var _RedisClusterSlots_nodeByAddress;
    var _RedisClusterSlots_slots;
    var _RedisClusterSlots_discoverNodes;
    var _RedisClusterSlots_runningRediscoverPromise;
    var _RedisClusterSlots_rediscover;
    var _RedisClusterSlots_reset;
    var _RedisClusterSlots_clientOptionsDefaults;
    var _RedisClusterSlots_initiateClient;
    var _RedisClusterSlots_getNodeAddress;
    var _RedisClusterSlots_initiateClientForNode;
    var _RedisClusterSlots_slotClientIterator;
    var _RedisClusterSlots_getSlotClient;
    var _RedisClusterSlots_randomClientIterator;
    var _RedisClusterSlots_getRandomClient;
    var _RedisClusterSlots_destroy;
    Object.defineProperty(exports, "__esModule", { value: true });
    var client_1 = require_client();
    var errors_1 = require_errors();
    var calculateSlot = require_lib();
    var RedisClusterSlots = class {
      constructor(options, onError) {
        _RedisClusterSlots_instances.add(this);
        _RedisClusterSlots_options.set(this, void 0);
        _RedisClusterSlots_Client.set(this, void 0);
        _RedisClusterSlots_onError.set(this, void 0);
        _RedisClusterSlots_nodeByAddress.set(this, /* @__PURE__ */ new Map());
        _RedisClusterSlots_slots.set(this, []);
        _RedisClusterSlots_runningRediscoverPromise.set(this, void 0);
        _RedisClusterSlots_randomClientIterator.set(this, void 0);
        __classPrivateFieldSet(this, _RedisClusterSlots_options, options, "f");
        __classPrivateFieldSet(this, _RedisClusterSlots_Client, client_1.default.extend(options), "f");
        __classPrivateFieldSet(this, _RedisClusterSlots_onError, onError, "f");
      }
      async connect() {
        for (const rootNode of __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").rootNodes) {
          if (await __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_discoverNodes).call(this, rootNode))
            return;
        }
        throw new errors_1.RootNodesUnavailableError();
      }
      async rediscover(startWith) {
        if (!__classPrivateFieldGet(this, _RedisClusterSlots_runningRediscoverPromise, "f")) {
          __classPrivateFieldSet(this, _RedisClusterSlots_runningRediscoverPromise, __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_rediscover).call(this, startWith).finally(() => __classPrivateFieldSet(this, _RedisClusterSlots_runningRediscoverPromise, void 0, "f")), "f");
        }
        return __classPrivateFieldGet(this, _RedisClusterSlots_runningRediscoverPromise, "f");
      }
      getSlotMaster(slot) {
        return __classPrivateFieldGet(this, _RedisClusterSlots_slots, "f")[slot].master;
      }
      getClient(firstKey, isReadonly) {
        if (!firstKey) {
          return __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_getRandomClient).call(this);
        }
        const slot = calculateSlot(firstKey);
        if (!isReadonly || !__classPrivateFieldGet(this, _RedisClusterSlots_options, "f").useReplicas) {
          return this.getSlotMaster(slot).client;
        }
        return __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_getSlotClient).call(this, slot);
      }
      getMasters() {
        var _a4;
        const masters = [];
        for (const node of __classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").values()) {
          if ((_a4 = node.client.options) === null || _a4 === void 0 ? void 0 : _a4.readonly)
            continue;
          masters.push(node);
        }
        return masters;
      }
      getNodeByAddress(address) {
        const mappedAddress = __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_getNodeAddress).call(this, address);
        return __classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").get(mappedAddress ? `${mappedAddress.host}:${mappedAddress.port}` : address);
      }
      quit() {
        return __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_destroy).call(this, (client2) => client2.quit());
      }
      disconnect() {
        return __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_destroy).call(this, (client2) => client2.disconnect());
      }
    };
    exports.default = RedisClusterSlots;
    _RedisClusterSlots_options = /* @__PURE__ */ new WeakMap(), _RedisClusterSlots_Client = /* @__PURE__ */ new WeakMap(), _RedisClusterSlots_onError = /* @__PURE__ */ new WeakMap(), _RedisClusterSlots_nodeByAddress = /* @__PURE__ */ new WeakMap(), _RedisClusterSlots_slots = /* @__PURE__ */ new WeakMap(), _RedisClusterSlots_runningRediscoverPromise = /* @__PURE__ */ new WeakMap(), _RedisClusterSlots_randomClientIterator = /* @__PURE__ */ new WeakMap(), _RedisClusterSlots_instances = /* @__PURE__ */ new WeakSet(), _RedisClusterSlots_discoverNodes = async function _RedisClusterSlots_discoverNodes2(clientOptions) {
      const client2 = __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_initiateClient).call(this, clientOptions);
      await client2.connect();
      try {
        await __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_reset).call(this, await client2.clusterNodes());
        return true;
      } catch (err) {
        __classPrivateFieldGet(this, _RedisClusterSlots_onError, "f").call(this, err);
        return false;
      } finally {
        if (client2.isOpen) {
          await client2.disconnect();
        }
      }
    }, _RedisClusterSlots_rediscover = async function _RedisClusterSlots_rediscover2(startWith) {
      if (await __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_discoverNodes).call(this, startWith.options))
        return;
      for (const { client: client2 } of __classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").values()) {
        if (client2 === startWith)
          continue;
        if (await __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_discoverNodes).call(this, client2.options))
          return;
      }
      throw new Error("None of the cluster nodes is available");
    }, _RedisClusterSlots_reset = async function _RedisClusterSlots_reset2(masters) {
      const promises = [], clientsInUse = /* @__PURE__ */ new Set();
      for (const master of masters) {
        const slot = {
          master: __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_initiateClientForNode).call(this, master, false, clientsInUse, promises),
          replicas: __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").useReplicas ? master.replicas.map((replica) => __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_initiateClientForNode).call(this, replica, true, clientsInUse, promises)) : [],
          clientIterator: void 0
        };
        for (const { from, to } of master.slots) {
          for (let i2 = from; i2 <= to; i2++) {
            __classPrivateFieldGet(this, _RedisClusterSlots_slots, "f")[i2] = slot;
          }
        }
      }
      for (const [address, { client: client2 }] of __classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").entries()) {
        if (clientsInUse.has(address))
          continue;
        promises.push(client2.disconnect());
        __classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").delete(address);
      }
      await Promise.all(promises);
    }, _RedisClusterSlots_clientOptionsDefaults = function _RedisClusterSlots_clientOptionsDefaults2(options) {
      var _a4;
      if (!__classPrivateFieldGet(this, _RedisClusterSlots_options, "f").defaults)
        return options;
      return __spreadProps(__spreadValues(__spreadValues({}, __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").defaults), options), {
        socket: __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").defaults.socket && (options === null || options === void 0 ? void 0 : options.socket) ? __spreadValues(__spreadValues({}, __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").defaults.socket), options.socket) : (_a4 = __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").defaults.socket) !== null && _a4 !== void 0 ? _a4 : options === null || options === void 0 ? void 0 : options.socket
      });
    }, _RedisClusterSlots_initiateClient = function _RedisClusterSlots_initiateClient2(options) {
      return new (__classPrivateFieldGet(this, _RedisClusterSlots_Client, "f"))(__classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_clientOptionsDefaults).call(this, options)).on("error", __classPrivateFieldGet(this, _RedisClusterSlots_onError, "f"));
    }, _RedisClusterSlots_getNodeAddress = function _RedisClusterSlots_getNodeAddress2(address) {
      switch (typeof __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").nodeAddressMap) {
        case "object":
          return __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").nodeAddressMap[address];
        case "function":
          return __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").nodeAddressMap(address);
      }
    }, _RedisClusterSlots_initiateClientForNode = function _RedisClusterSlots_initiateClientForNode2(nodeData, readonly, clientsInUse, promises) {
      var _a4;
      const address = `${nodeData.host}:${nodeData.port}`;
      clientsInUse.add(address);
      let node = __classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").get(address);
      if (!node) {
        node = {
          id: nodeData.id,
          client: __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_initiateClient).call(this, {
            socket: (_a4 = __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_getNodeAddress).call(this, address)) !== null && _a4 !== void 0 ? _a4 : {
              host: nodeData.host,
              port: nodeData.port
            },
            readonly
          })
        };
        promises.push(node.client.connect());
        __classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").set(address, node);
      }
      return node;
    }, _RedisClusterSlots_slotClientIterator = function* _RedisClusterSlots_slotClientIterator2(slotNumber) {
      const slot = __classPrivateFieldGet(this, _RedisClusterSlots_slots, "f")[slotNumber];
      yield slot.master.client;
      for (const replica of slot.replicas) {
        yield replica.client;
      }
    }, _RedisClusterSlots_getSlotClient = function _RedisClusterSlots_getSlotClient2(slotNumber) {
      const slot = __classPrivateFieldGet(this, _RedisClusterSlots_slots, "f")[slotNumber];
      if (!slot.clientIterator) {
        slot.clientIterator = __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_slotClientIterator).call(this, slotNumber);
      }
      const { done, value } = slot.clientIterator.next();
      if (done) {
        slot.clientIterator = void 0;
        return __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_getSlotClient2).call(this, slotNumber);
      }
      return value;
    }, _RedisClusterSlots_getRandomClient = function _RedisClusterSlots_getRandomClient2() {
      if (!__classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").size) {
        throw new Error("Cluster is not connected");
      }
      if (!__classPrivateFieldGet(this, _RedisClusterSlots_randomClientIterator, "f")) {
        __classPrivateFieldSet(this, _RedisClusterSlots_randomClientIterator, __classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").values(), "f");
      }
      const { done, value } = __classPrivateFieldGet(this, _RedisClusterSlots_randomClientIterator, "f").next();
      if (done) {
        __classPrivateFieldSet(this, _RedisClusterSlots_randomClientIterator, void 0, "f");
        return __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_getRandomClient2).call(this);
      }
      return value.client;
    }, _RedisClusterSlots_destroy = async function _RedisClusterSlots_destroy2(fn) {
      const promises = [];
      for (const { client: client2 } of __classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").values()) {
        promises.push(fn(client2));
      }
      await Promise.all(promises);
      __classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").clear();
      __classPrivateFieldGet(this, _RedisClusterSlots_slots, "f").splice(0);
    };
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/cluster/multi-command.js
var require_multi_command3 = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/cluster/multi-command.js"(exports) {
    "use strict";
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f3) {
      if (kind === "m")
        throw new TypeError("Private method is not writable");
      if (kind === "a" && !f3)
        throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
        throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f3.call(receiver, value) : f3 ? f3.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f3) {
      if (kind === "a" && !f3)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f3 : kind === "a" ? f3.call(receiver) : f3 ? f3.value : state.get(receiver);
    };
    var _RedisClusterMultiCommand_multi;
    var _RedisClusterMultiCommand_executor;
    var _RedisClusterMultiCommand_firstKey;
    Object.defineProperty(exports, "__esModule", { value: true });
    var commands_1 = require_commands();
    var multi_command_1 = require_multi_command();
    var commander_1 = require_commander();
    var _1 = require_cluster();
    var RedisClusterMultiCommand = class {
      constructor(executor, firstKey) {
        _RedisClusterMultiCommand_multi.set(this, new multi_command_1.default());
        _RedisClusterMultiCommand_executor.set(this, void 0);
        _RedisClusterMultiCommand_firstKey.set(this, void 0);
        Object.defineProperty(this, "EXEC", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: this.exec
        });
        __classPrivateFieldSet(this, _RedisClusterMultiCommand_executor, executor, "f");
        __classPrivateFieldSet(this, _RedisClusterMultiCommand_firstKey, firstKey, "f");
      }
      static extend(plugins) {
        return (0, commander_1.extendWithModulesAndScripts)({
          BaseClass: RedisClusterMultiCommand,
          modules: plugins === null || plugins === void 0 ? void 0 : plugins.modules,
          modulesCommandsExecutor: RedisClusterMultiCommand.prototype.commandsExecutor,
          scripts: plugins === null || plugins === void 0 ? void 0 : plugins.scripts,
          scriptsExecutor: RedisClusterMultiCommand.prototype.scriptsExecutor
        });
      }
      commandsExecutor(command, args) {
        const transformedArguments = command.transformArguments(...args);
        if (!__classPrivateFieldGet(this, _RedisClusterMultiCommand_firstKey, "f")) {
          __classPrivateFieldSet(this, _RedisClusterMultiCommand_firstKey, _1.default.extractFirstKey(command, args, transformedArguments), "f");
        }
        return this.addCommand(void 0, transformedArguments, command.transformReply);
      }
      addCommand(firstKey, args, transformReply) {
        if (!__classPrivateFieldGet(this, _RedisClusterMultiCommand_firstKey, "f")) {
          __classPrivateFieldSet(this, _RedisClusterMultiCommand_firstKey, firstKey, "f");
        }
        __classPrivateFieldGet(this, _RedisClusterMultiCommand_multi, "f").addCommand(args, transformReply);
        return this;
      }
      scriptsExecutor(script, args) {
        const transformedArguments = __classPrivateFieldGet(this, _RedisClusterMultiCommand_multi, "f").addScript(script, args);
        if (!__classPrivateFieldGet(this, _RedisClusterMultiCommand_firstKey, "f")) {
          __classPrivateFieldSet(this, _RedisClusterMultiCommand_firstKey, _1.default.extractFirstKey(script, args, transformedArguments), "f");
        }
        return this.addCommand(void 0, transformedArguments);
      }
      async exec(execAsPipeline = false) {
        if (execAsPipeline) {
          return this.execAsPipeline();
        }
        const commands = __classPrivateFieldGet(this, _RedisClusterMultiCommand_multi, "f").exec();
        if (!commands)
          return [];
        return __classPrivateFieldGet(this, _RedisClusterMultiCommand_multi, "f").handleExecReplies(await __classPrivateFieldGet(this, _RedisClusterMultiCommand_executor, "f").call(this, commands, __classPrivateFieldGet(this, _RedisClusterMultiCommand_firstKey, "f"), multi_command_1.default.generateChainId()));
      }
      async execAsPipeline() {
        return __classPrivateFieldGet(this, _RedisClusterMultiCommand_multi, "f").transformReplies(await __classPrivateFieldGet(this, _RedisClusterMultiCommand_executor, "f").call(this, __classPrivateFieldGet(this, _RedisClusterMultiCommand_multi, "f").queue, __classPrivateFieldGet(this, _RedisClusterMultiCommand_firstKey, "f")));
      }
    };
    exports.default = RedisClusterMultiCommand;
    _RedisClusterMultiCommand_multi = /* @__PURE__ */ new WeakMap(), _RedisClusterMultiCommand_executor = /* @__PURE__ */ new WeakMap(), _RedisClusterMultiCommand_firstKey = /* @__PURE__ */ new WeakMap();
    (0, commander_1.extendWithCommands)({
      BaseClass: RedisClusterMultiCommand,
      commands: commands_1.default,
      executor: RedisClusterMultiCommand.prototype.commandsExecutor
    });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/cluster/index.js
var require_cluster = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/cluster/index.js"(exports) {
    "use strict";
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f3) {
      if (kind === "m")
        throw new TypeError("Private method is not writable");
      if (kind === "a" && !f3)
        throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
        throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f3.call(receiver, value) : f3 ? f3.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f3) {
      if (kind === "a" && !f3)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f3 : kind === "a" ? f3.call(receiver) : f3 ? f3.value : state.get(receiver);
    };
    var _RedisCluster_instances;
    var _RedisCluster_options;
    var _RedisCluster_slots;
    var _RedisCluster_Multi;
    var _RedisCluster_execute;
    Object.defineProperty(exports, "__esModule", { value: true });
    var commands_1 = require_commands();
    var cluster_slots_1 = require_cluster_slots();
    var commander_1 = require_commander();
    var events_1 = require("events");
    var multi_command_1 = require_multi_command3();
    var RedisCluster = class extends events_1.EventEmitter {
      constructor(options) {
        super();
        _RedisCluster_instances.add(this);
        _RedisCluster_options.set(this, void 0);
        _RedisCluster_slots.set(this, void 0);
        _RedisCluster_Multi.set(this, void 0);
        __classPrivateFieldSet(this, _RedisCluster_options, options, "f");
        __classPrivateFieldSet(this, _RedisCluster_slots, new cluster_slots_1.default(options, (err) => this.emit("error", err)), "f");
        __classPrivateFieldSet(this, _RedisCluster_Multi, multi_command_1.default.extend(options), "f");
      }
      static extractFirstKey(command, originalArgs, redisArgs) {
        if (command.FIRST_KEY_INDEX === void 0) {
          return void 0;
        } else if (typeof command.FIRST_KEY_INDEX === "number") {
          return redisArgs[command.FIRST_KEY_INDEX];
        }
        return command.FIRST_KEY_INDEX(...originalArgs);
      }
      static create(options) {
        return new ((0, commander_1.extendWithModulesAndScripts)({
          BaseClass: RedisCluster,
          modules: options === null || options === void 0 ? void 0 : options.modules,
          modulesCommandsExecutor: RedisCluster.prototype.commandsExecutor,
          scripts: options === null || options === void 0 ? void 0 : options.scripts,
          scriptsExecutor: RedisCluster.prototype.scriptsExecutor
        }))(options);
      }
      duplicate(overrides) {
        return new (Object.getPrototypeOf(this)).constructor(__spreadValues(__spreadValues({}, __classPrivateFieldGet(this, _RedisCluster_options, "f")), overrides));
      }
      async connect() {
        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").connect();
      }
      async commandsExecutor(command, args) {
        const { args: redisArgs, options } = (0, commander_1.transformCommandArguments)(command, args);
        return (0, commander_1.transformCommandReply)(command, await this.sendCommand(RedisCluster.extractFirstKey(command, args, redisArgs), command.IS_READ_ONLY, redisArgs, options), redisArgs.preserve);
      }
      async sendCommand(firstKey, isReadonly, args, options) {
        return __classPrivateFieldGet(this, _RedisCluster_instances, "m", _RedisCluster_execute).call(this, firstKey, isReadonly, (client2) => client2.sendCommand(args, options));
      }
      async scriptsExecutor(script, args) {
        const { args: redisArgs, options } = (0, commander_1.transformCommandArguments)(script, args);
        return (0, commander_1.transformCommandReply)(script, await this.executeScript(script, args, redisArgs, options), redisArgs.preserve);
      }
      async executeScript(script, originalArgs, redisArgs, options) {
        return __classPrivateFieldGet(this, _RedisCluster_instances, "m", _RedisCluster_execute).call(this, RedisCluster.extractFirstKey(script, originalArgs, redisArgs), script.IS_READ_ONLY, (client2) => client2.executeScript(script, redisArgs, options));
      }
      multi(routing) {
        return new (__classPrivateFieldGet(this, _RedisCluster_Multi, "f"))((commands, firstKey, chainId) => {
          return __classPrivateFieldGet(this, _RedisCluster_instances, "m", _RedisCluster_execute).call(this, firstKey, false, (client2) => client2.multiExecutor(commands, chainId));
        }, routing);
      }
      getMasters() {
        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").getMasters();
      }
      getSlotMaster(slot) {
        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").getSlotMaster(slot);
      }
      quit() {
        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").quit();
      }
      disconnect() {
        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").disconnect();
      }
    };
    exports.default = RedisCluster;
    _RedisCluster_options = /* @__PURE__ */ new WeakMap(), _RedisCluster_slots = /* @__PURE__ */ new WeakMap(), _RedisCluster_Multi = /* @__PURE__ */ new WeakMap(), _RedisCluster_instances = /* @__PURE__ */ new WeakSet(), _RedisCluster_execute = async function _RedisCluster_execute2(firstKey, isReadonly, executor) {
      var _a4, _b;
      const maxCommandRedirections = (_a4 = __classPrivateFieldGet(this, _RedisCluster_options, "f").maxCommandRedirections) !== null && _a4 !== void 0 ? _a4 : 16;
      let client2 = __classPrivateFieldGet(this, _RedisCluster_slots, "f").getClient(firstKey, isReadonly);
      for (let i2 = 0; ; i2++) {
        try {
          return await executor(client2);
        } catch (err) {
          if (++i2 > maxCommandRedirections || !(err instanceof Error)) {
            throw err;
          }
          if (err.message.startsWith("ASK")) {
            const address = err.message.substring(err.message.lastIndexOf(" ") + 1);
            if (((_b = __classPrivateFieldGet(this, _RedisCluster_slots, "f").getNodeByAddress(address)) === null || _b === void 0 ? void 0 : _b.client) === client2) {
              await client2.asking();
              continue;
            }
            await __classPrivateFieldGet(this, _RedisCluster_slots, "f").rediscover(client2);
            const redirectTo = __classPrivateFieldGet(this, _RedisCluster_slots, "f").getNodeByAddress(address);
            if (!redirectTo) {
              throw new Error(`Cannot find node ${address}`);
            }
            await redirectTo.client.asking();
            client2 = redirectTo.client;
            continue;
          } else if (err.message.startsWith("MOVED")) {
            await __classPrivateFieldGet(this, _RedisCluster_slots, "f").rediscover(client2);
            client2 = __classPrivateFieldGet(this, _RedisCluster_slots, "f").getClient(firstKey, isReadonly);
            continue;
          }
          throw err;
        }
      }
    };
    (0, commander_1.extendWithCommands)({
      BaseClass: RedisCluster,
      commands: commands_1.default,
      executor: RedisCluster.prototype.commandsExecutor
    });
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/lua-script.js
var require_lua_script = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/lib/lua-script.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.scriptSha1 = exports.defineScript = void 0;
    var crypto_1 = require("crypto");
    function defineScript(script) {
      return __spreadProps(__spreadValues({}, script), {
        SHA1: scriptSha1(script.SCRIPT)
      });
    }
    exports.defineScript = defineScript;
    function scriptSha1(script) {
      return (0, crypto_1.createHash)("sha1").update(script).digest("hex");
    }
    exports.scriptSha1 = scriptSha1;
  }
});

// node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/@node-redis+client@1.0.4/node_modules/@node-redis/client/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m2, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m2[k];
      } });
    } : function(o, m2, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m2[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m2, exports2) {
      for (var p in m2)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m2, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defineScript = exports.createCluster = exports.commandOptions = exports.createClient = void 0;
    var client_1 = require_client();
    var cluster_1 = require_cluster();
    exports.createClient = client_1.default.create;
    exports.commandOptions = client_1.default.commandOptions;
    exports.createCluster = cluster_1.default.create;
    var lua_script_1 = require_lua_script();
    Object.defineProperty(exports, "defineScript", { enumerable: true, get: function() {
      return lua_script_1.defineScript;
    } });
    __exportStar(require_errors(), exports);
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/bloom/ADD.js
var require_ADD = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/bloom/ADD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, item) {
      return ["BF.ADD", key2, item];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/bloom/EXISTS.js
var require_EXISTS2 = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/bloom/EXISTS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, item) {
      return ["BF.EXISTS", key2, item];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/bloom/INFO.js
var require_INFO2 = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/bloom/INFO.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2) {
      return ["BF.INFO", key2];
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return {
        capacity: reply[1],
        size: reply[3],
        numberOfFilters: reply[5],
        numberOfInsertedItems: reply[7],
        expansionRate: reply[9]
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/bloom/INSERT.js
var require_INSERT = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/bloom/INSERT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, items, options) {
      const args = ["BF.INSERT", key2];
      if (options === null || options === void 0 ? void 0 : options.CAPACITY) {
        args.push("CAPACITY", options.CAPACITY.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.ERROR) {
        args.push("ERROR", options.ERROR.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.EXPANSION) {
        args.push("EXPANSION", options.EXPANSION.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.NOCREATE) {
        args.push("NOCREATE");
      }
      if (options === null || options === void 0 ? void 0 : options.NONSCALING) {
        args.push("NONSCALING");
      }
      args.push("ITEMS");
      (0, generic_transformers_1.pushVerdictArguments)(args, items);
      return args;
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_2 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_2.transformBooleanArrayReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/bloom/LOADCHUNK.js
var require_LOADCHUNK = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/bloom/LOADCHUNK.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, iteretor, chunk) {
      return ["BF.LOADCHUNK", key2, iteretor.toString(), chunk];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/bloom/MADD.js
var require_MADD = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/bloom/MADD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, items) {
      return ["BF.MADD", key2, ...items];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanArrayReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/bloom/MEXISTS.js
var require_MEXISTS = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/bloom/MEXISTS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, items) {
      return ["BF.MEXISTS", key2, ...items];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanArrayReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/bloom/RESERVE.js
var require_RESERVE = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/bloom/RESERVE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, errorRate, capacity, options) {
      const args = ["BF.RESERVE", key2, errorRate.toString(), capacity.toString()];
      if (options === null || options === void 0 ? void 0 : options.EXPANSION) {
        args.push("EXPANSION", options.EXPANSION.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.NONSCALING) {
        args.push("NONSCALING");
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/bloom/SCANDUMP.js
var require_SCANDUMP = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/bloom/SCANDUMP.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, iterator) {
      return ["BF.SCANDUMP", key2, iterator.toString()];
    }
    exports.transformArguments = transformArguments;
    function transformReply([iterator, chunk]) {
      return {
        iterator,
        chunk
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/bloom/index.js
var require_bloom = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/bloom/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ADD = require_ADD();
    var EXISTS = require_EXISTS2();
    var INFO = require_INFO2();
    var INSERT = require_INSERT();
    var LOADCHUNK = require_LOADCHUNK();
    var MADD = require_MADD();
    var MEXISTS = require_MEXISTS();
    var RESERVE = require_RESERVE();
    var SCANDUMP = require_SCANDUMP();
    exports.default = {
      ADD,
      add: ADD,
      EXISTS,
      exists: EXISTS,
      INFO,
      info: INFO,
      INSERT,
      insert: INSERT,
      LOADCHUNK,
      loadChunk: LOADCHUNK,
      MADD,
      mAdd: MADD,
      MEXISTS,
      mExists: MEXISTS,
      RESERVE,
      reserve: RESERVE,
      SCANDUMP,
      scanDump: SCANDUMP
    };
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/count-min-sketch/INCRBY.js
var require_INCRBY2 = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/count-min-sketch/INCRBY.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, items) {
      const args = ["CMS.INCRBY", key2];
      if (Array.isArray(items)) {
        for (const item of items) {
          pushIncrByItem(args, item);
        }
      } else {
        pushIncrByItem(args, items);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    function pushIncrByItem(args, { item, incrementBy }) {
      args.push(item, incrementBy.toString());
    }
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/count-min-sketch/INFO.js
var require_INFO3 = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/count-min-sketch/INFO.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2) {
      return ["CMS.INFO", key2];
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return {
        width: reply[1],
        depth: reply[3],
        count: reply[5]
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/count-min-sketch/INITBYDIM.js
var require_INITBYDIM = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/count-min-sketch/INITBYDIM.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, width, depth) {
      return ["CMS.INITBYDIM", key2, width.toString(), depth.toString()];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/count-min-sketch/INITBYPROB.js
var require_INITBYPROB = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/count-min-sketch/INITBYPROB.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, error2, probability) {
      return ["CMS.INITBYPROB", key2, error2.toString(), probability.toString()];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/count-min-sketch/MERGE.js
var require_MERGE = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/count-min-sketch/MERGE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(dest, src) {
      const args = [
        "CMS.MERGE",
        dest,
        src.length.toString()
      ];
      if (isStringSketches(src)) {
        args.push(...src);
      } else {
        for (const sketch of src) {
          args.push(sketch.name);
        }
        args.push("WEIGHTS");
        for (const sketch of src) {
          args.push(sketch.weight.toString());
        }
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    function isStringSketches(src) {
      return typeof src[0] === "string";
    }
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/count-min-sketch/QUERY.js
var require_QUERY = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/count-min-sketch/QUERY.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, items) {
      return (0, generic_transformers_1.pushVerdictArguments)(["CMS.QUERY", key2], items);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/count-min-sketch/index.js
var require_count_min_sketch = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/count-min-sketch/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var INCRBY = require_INCRBY2();
    var INFO = require_INFO3();
    var INITBYDIM = require_INITBYDIM();
    var INITBYPROB = require_INITBYPROB();
    var MERGE = require_MERGE();
    var QUERY = require_QUERY();
    exports.default = {
      INCRBY,
      incrBy: INCRBY,
      INFO,
      info: INFO,
      INITBYDIM,
      initByDim: INITBYDIM,
      INITBYPROB,
      initByProb: INITBYPROB,
      MERGE,
      merge: MERGE,
      QUERY,
      query: QUERY
    };
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/ADD.js
var require_ADD2 = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/ADD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, item) {
      return ["CF.ADD", key2, item];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/ADDNX.js
var require_ADDNX = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/ADDNX.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, item) {
      return ["CF.ADDNX", key2, item];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/COUNT.js
var require_COUNT = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/COUNT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, item) {
      return ["CF.COUNT", key2, item];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/DEL.js
var require_DEL2 = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/DEL.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, item) {
      return ["CF.DEL", key2, item];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/EXISTS.js
var require_EXISTS3 = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/EXISTS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, item) {
      return ["CF.EXISTS", key2, item];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/INFO.js
var require_INFO4 = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/INFO.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2) {
      return ["CF.INFO", key2];
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return {
        size: reply[1],
        numberOfBuckets: reply[3],
        numberOfFilters: reply[5],
        numberOfInsertedItems: reply[7],
        numberOfDeletedItems: reply[9],
        bucketSize: reply[11],
        expansionRate: reply[13],
        maxIteration: reply[15]
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/INSERT.js
var require_INSERT2 = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/INSERT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var _1 = require_cuckoo();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, items, options) {
      return (0, _1.pushInsertOptions)(["CF.INSERT", key2], items, options);
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanArrayReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/INSERTNX.js
var require_INSERTNX = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/INSERTNX.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var _1 = require_cuckoo();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, items, options) {
      return (0, _1.pushInsertOptions)(["CF.INSERTNX", key2], items, options);
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanArrayReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/LOADCHUNK.js
var require_LOADCHUNK2 = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/LOADCHUNK.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, iterator, chunk) {
      return ["CF.LOADCHUNK", key2, iterator.toString(), chunk];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/RESERVE.js
var require_RESERVE2 = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/RESERVE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, capacity, options) {
      const args = ["CF.RESERVE", key2, capacity.toString()];
      if (options === null || options === void 0 ? void 0 : options.BUCKETSIZE) {
        args.push("BUCKETSIZE", options.BUCKETSIZE.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.MAXITERATIONS) {
        args.push("MAXITERATIONS", options.MAXITERATIONS.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.EXPANSION) {
        args.push("EXPANSION", options.EXPANSION.toString());
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/SCANDUMP.js
var require_SCANDUMP2 = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/SCANDUMP.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, iterator) {
      return ["CF.SCANDUMP", key2, iterator.toString()];
    }
    exports.transformArguments = transformArguments;
    function transformReply([iterator, chunk]) {
      return {
        iterator,
        chunk
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/index.js
var require_cuckoo = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/cuckoo/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pushInsertOptions = void 0;
    var ADD = require_ADD2();
    var ADDNX = require_ADDNX();
    var COUNT = require_COUNT();
    var DEL = require_DEL2();
    var EXISTS = require_EXISTS3();
    var INFO = require_INFO4();
    var INSERT = require_INSERT2();
    var INSERTNX = require_INSERTNX();
    var LOADCHUNK = require_LOADCHUNK2();
    var RESERVE = require_RESERVE2();
    var SCANDUMP = require_SCANDUMP2();
    var generic_transformers_1 = require_generic_transformers();
    exports.default = {
      ADD,
      add: ADD,
      ADDNX,
      addNX: ADDNX,
      COUNT,
      count: COUNT,
      DEL,
      del: DEL,
      EXISTS,
      exists: EXISTS,
      INFO,
      info: INFO,
      INSERT,
      insert: INSERT,
      INSERTNX,
      insertNX: INSERTNX,
      LOADCHUNK,
      loadChunk: LOADCHUNK,
      RESERVE,
      reserve: RESERVE,
      SCANDUMP,
      scanDump: SCANDUMP
    };
    function pushInsertOptions(args, items, options) {
      if (options === null || options === void 0 ? void 0 : options.CAPACITY) {
        args.push("CAPACITY");
        args.push(options.CAPACITY.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.NOCREATE) {
        args.push("NOCREATE");
      }
      args.push("ITEMS");
      return (0, generic_transformers_1.pushVerdictArguments)(args, items);
    }
    exports.pushInsertOptions = pushInsertOptions;
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/top-k/ADD.js
var require_ADD3 = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/top-k/ADD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, items) {
      return (0, generic_transformers_1.pushVerdictArguments)(["TOPK.ADD", key2], items);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/top-k/COUNT.js
var require_COUNT2 = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/top-k/COUNT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, items) {
      return (0, generic_transformers_1.pushVerdictArguments)(["TOPK.COUNT", key2], items);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/top-k/INCRBY.js
var require_INCRBY3 = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/top-k/INCRBY.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, items) {
      const args = ["TOPK.INCRBY", key2];
      if (Array.isArray(items)) {
        for (const item of items) {
          pushIncrByItem(args, item);
        }
      } else {
        pushIncrByItem(args, items);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    function pushIncrByItem(args, { item, incrementBy }) {
      args.push(item, incrementBy.toString());
    }
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/top-k/INFO.js
var require_INFO5 = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/top-k/INFO.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2) {
      return ["TOPK.INFO", key2];
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return {
        k: reply[1],
        width: reply[3],
        depth: reply[5],
        decay: Number(reply[7])
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/top-k/LIST.js
var require_LIST = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/top-k/LIST.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2) {
      return ["TOPK.LIST", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/top-k/QUERY.js
var require_QUERY2 = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/top-k/QUERY.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, items) {
      return (0, generic_transformers_1.pushVerdictArguments)(["TOPK.QUERY", key2], items);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/top-k/RESERVE.js
var require_RESERVE3 = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/top-k/RESERVE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, topK, options) {
      const args = ["TOPK.RESERVE", key2, topK.toString()];
      if (options) {
        args.push(options.width.toString(), options.depth.toString(), options.decay.toString());
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/top-k/index.js
var require_top_k = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/top-k/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ADD = require_ADD3();
    var COUNT = require_COUNT2();
    var INCRBY = require_INCRBY3();
    var INFO = require_INFO5();
    var LIST = require_LIST();
    var QUERY = require_QUERY2();
    var RESERVE = require_RESERVE3();
    exports.default = {
      ADD,
      add: ADD,
      COUNT,
      count: COUNT,
      INCRBY,
      incrBy: INCRBY,
      INFO,
      info: INFO,
      LIST,
      list: LIST,
      QUERY,
      query: QUERY,
      RESERVE,
      reserve: RESERVE
    };
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/index.js
var require_commands3 = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/commands/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var bloom_1 = require_bloom();
    var count_min_sketch_1 = require_count_min_sketch();
    var cuckoo_1 = require_cuckoo();
    var top_k_1 = require_top_k();
    exports.default = {
      bf: bloom_1.default,
      cms: count_min_sketch_1.default,
      cf: cuckoo_1.default,
      topK: top_k_1.default
    };
  }
});

// node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/.pnpm/@node-redis+bloom@1.0.1_@node-redis+client@1.0.4/node_modules/@node-redis/bloom/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = void 0;
    var commands_1 = require_commands3();
    Object.defineProperty(exports, "default", { enumerable: true, get: function() {
      return commands_1.default;
    } });
  }
});

// node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/commands/CONFIG_GET.js
var require_CONFIG_GET2 = __commonJS({
  "node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/commands/CONFIG_GET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = void 0;
    exports.IS_READ_ONLY = true;
    function transformArguments(configKey) {
      return ["GRAPH.CONFIG", "GET", configKey];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/commands/CONFIG_SET.js
var require_CONFIG_SET2 = __commonJS({
  "node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/commands/CONFIG_SET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(configKey, value) {
      return [
        "GRAPH.CONFIG",
        "SET",
        configKey,
        value.toString()
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/commands/DELETE.js
var require_DELETE = __commonJS({
  "node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/commands/DELETE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2) {
      return ["GRAPH.DELETE", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/commands/EXPLAIN.js
var require_EXPLAIN = __commonJS({
  "node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/commands/EXPLAIN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, query) {
      return ["GRAPH.EXPLAIN", key2, query];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/commands/LIST.js
var require_LIST2 = __commonJS({
  "node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/commands/LIST.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = void 0;
    exports.IS_READ_ONLY = true;
    function transformArguments() {
      return ["GRAPH.LIST"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/commands/PROFILE.js
var require_PROFILE = __commonJS({
  "node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/commands/PROFILE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, query) {
      return ["GRAPH.PROFILE", key2, query];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/commands/QUERY.js
var require_QUERY3 = __commonJS({
  "node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/commands/QUERY.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var _1 = require_commands4();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(graph, query, timeout) {
      return (0, _1.pushQueryArguments)(["GRAPH.QUERY"], graph, query, timeout);
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return {
        headers: reply[0],
        data: reply[1],
        metadata: reply[2]
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/commands/QUERY_RO.js
var require_QUERY_RO = __commonJS({
  "node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/commands/QUERY_RO.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var _1 = require_commands4();
    var QUERY_1 = require_QUERY3();
    Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
      return QUERY_1.FIRST_KEY_INDEX;
    } });
    exports.IS_READ_ONLY = true;
    function transformArguments(graph, query, timeout) {
      return (0, _1.pushQueryArguments)(["GRAPH.RO_QUERY"], graph, query, timeout);
    }
    exports.transformArguments = transformArguments;
    var QUERY_2 = require_QUERY3();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return QUERY_2.transformReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/commands/SLOWLOG.js
var require_SLOWLOG = __commonJS({
  "node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/commands/SLOWLOG.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = exports.IS_READ_ONLY = void 0;
    exports.IS_READ_ONLY = true;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2) {
      return ["GRAPH.SLOWLOG", key2];
    }
    exports.transformArguments = transformArguments;
    function transformReply(logs) {
      return logs.map(([timestamp, command, query, took]) => ({
        timestamp: new Date(Number(timestamp) * 1e3),
        command,
        query,
        took: Number(took)
      }));
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/commands/index.js
var require_commands4 = __commonJS({
  "node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/commands/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pushQueryArguments = void 0;
    var CONFIG_GET = require_CONFIG_GET2();
    var CONFIG_SET = require_CONFIG_SET2();
    var DELETE = require_DELETE();
    var EXPLAIN = require_EXPLAIN();
    var LIST = require_LIST2();
    var PROFILE = require_PROFILE();
    var QUERY_RO = require_QUERY_RO();
    var QUERY = require_QUERY3();
    var SLOWLOG = require_SLOWLOG();
    exports.default = {
      CONFIG_GET,
      configGet: CONFIG_GET,
      CONFIG_SET,
      configSet: CONFIG_SET,
      DELETE,
      delete: DELETE,
      EXPLAIN,
      explain: EXPLAIN,
      LIST,
      list: LIST,
      PROFILE,
      profile: PROFILE,
      QUERY_RO,
      queryRo: QUERY_RO,
      QUERY,
      query: QUERY,
      SLOWLOG,
      slowLog: SLOWLOG
    };
    function pushQueryArguments(args, graph, query, timeout) {
      args.push(graph, query);
      if (timeout !== void 0) {
        args.push(timeout.toString());
      }
      return args;
    }
    exports.pushQueryArguments = pushQueryArguments;
  }
});

// node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/index.js
var require_dist3 = __commonJS({
  "node_modules/.pnpm/@node-redis+graph@1.0.0_@node-redis+client@1.0.4/node_modules/@node-redis/graph/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = void 0;
    var commands_1 = require_commands4();
    Object.defineProperty(exports, "default", { enumerable: true, get: function() {
      return commands_1.default;
    } });
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/ARRAPPEND.js
var require_ARRAPPEND = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/ARRAPPEND.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var _1 = require_commands5();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, path, ...jsons) {
      const args = ["JSON.ARRAPPEND", key2, path];
      for (const json of jsons) {
        args.push((0, _1.transformRedisJsonArgument)(json));
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/ARRINDEX.js
var require_ARRINDEX = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/ARRINDEX.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var _1 = require_commands5();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, path, json, start, stop) {
      const args = ["JSON.ARRINDEX", key2, path, (0, _1.transformRedisJsonArgument)(json)];
      if (start !== void 0 && start !== null) {
        args.push(start.toString());
        if (stop !== void 0 && stop !== null) {
          args.push(stop.toString());
        }
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/ARRINSERT.js
var require_ARRINSERT = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/ARRINSERT.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var _1 = require_commands5();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, path, index, ...jsons) {
      const args = ["JSON.ARRINSERT", key2, path, index.toString()];
      for (const json of jsons) {
        args.push((0, _1.transformRedisJsonArgument)(json));
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/ARRLEN.js
var require_ARRLEN = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/ARRLEN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, path) {
      const args = ["JSON.ARRLEN", key2];
      if (path) {
        args.push(path);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/ARRPOP.js
var require_ARRPOP = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/ARRPOP.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var _1 = require_commands5();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, path, index) {
      const args = ["JSON.ARRPOP", key2];
      if (path) {
        args.push(path);
        if (index !== void 0 && index !== null) {
          args.push(index.toString());
        }
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      if (reply === null)
        return null;
      if (Array.isArray(reply)) {
        return reply.map(_1.transformRedisJsonNullReply);
      }
      return (0, _1.transformRedisJsonNullReply)(reply);
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/ARRTRIM.js
var require_ARRTRIM = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/ARRTRIM.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, path, start, stop) {
      return ["JSON.ARRTRIM", key2, path, start.toString(), stop.toString()];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/DEBUG_MEMORY.js
var require_DEBUG_MEMORY = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/DEBUG_MEMORY.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 2;
    function transformArguments(key2, path) {
      const args = ["JSON.DEBUG", "MEMORY", key2];
      if (path) {
        args.push(path);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/DEL.js
var require_DEL3 = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/DEL.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, path) {
      const args = ["JSON.DEL", key2];
      if (path) {
        args.push(path);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/FORGET.js
var require_FORGET = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/FORGET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, path) {
      const args = ["JSON.FORGET", key2];
      if (path) {
        args.push(path);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/GET.js
var require_GET2 = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/GET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, options) {
      const args = ["JSON.GET", key2];
      if (options === null || options === void 0 ? void 0 : options.path) {
        (0, generic_transformers_1.pushVerdictArguments)(args, options.path);
      }
      if (options === null || options === void 0 ? void 0 : options.INDENT) {
        args.push("INDENT", options.INDENT);
      }
      if (options === null || options === void 0 ? void 0 : options.NEWLINE) {
        args.push("NEWLINE", options.NEWLINE);
      }
      if (options === null || options === void 0 ? void 0 : options.SPACE) {
        args.push("SPACE", options.SPACE);
      }
      if (options === null || options === void 0 ? void 0 : options.NOESCAPE) {
        args.push("NOESCAPE");
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    var _1 = require_commands5();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return _1.transformRedisJsonNullReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/MGET.js
var require_MGET2 = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/MGET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var _1 = require_commands5();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(keys, path) {
      return [
        "JSON.MGET",
        ...keys,
        path
      ];
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return reply.map(_1.transformRedisJsonNullReply);
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/NUMINCRBY.js
var require_NUMINCRBY = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/NUMINCRBY.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, path, by) {
      return ["JSON.NUMINCRBY", key2, path, by.toString()];
    }
    exports.transformArguments = transformArguments;
    var _1 = require_commands5();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return _1.transformNumbersReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/NUMMULTBY.js
var require_NUMMULTBY = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/NUMMULTBY.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, path, by) {
      return ["JSON.NUMMULTBY", key2, path, by.toString()];
    }
    exports.transformArguments = transformArguments;
    var _1 = require_commands5();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return _1.transformNumbersReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/OBJKEYS.js
var require_OBJKEYS = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/OBJKEYS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, path) {
      const args = ["JSON.OBJKEYS", key2];
      if (path) {
        args.push(path);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/OBJLEN.js
var require_OBJLEN = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/OBJLEN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, path) {
      const args = ["JSON.OBJLEN", key2];
      if (path) {
        args.push(path);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/RESP.js
var require_RESP = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/RESP.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, path) {
      const args = ["JSON.RESP", key2];
      if (path) {
        args.push(path);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/SET.js
var require_SET2 = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/SET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var _1 = require_commands5();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, path, json, options) {
      var _a4, _b;
      const args = ["JSON.SET", key2, path, (0, _1.transformRedisJsonArgument)(json)];
      if ((_a4 = options) === null || _a4 === void 0 ? void 0 : _a4.NX) {
        args.push("NX");
      } else if ((_b = options) === null || _b === void 0 ? void 0 : _b.XX) {
        args.push("XX");
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/STRAPPEND.js
var require_STRAPPEND = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/STRAPPEND.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var _1 = require_commands5();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(...[key2, pathOrAppend, append]) {
      const args = ["JSON.STRAPPEND", key2];
      if (append !== void 0 && append !== null) {
        args.push(pathOrAppend, (0, _1.transformRedisJsonArgument)(append));
      } else {
        args.push((0, _1.transformRedisJsonArgument)(pathOrAppend));
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/STRLEN.js
var require_STRLEN2 = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/STRLEN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, path) {
      const args = ["JSON.STRLEN", key2];
      if (path) {
        args.push(path);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/TYPE.js
var require_TYPE2 = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/TYPE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, path) {
      const args = ["JSON.TYPE", key2];
      if (path) {
        args.push(path);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/index.js
var require_commands5 = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/commands/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformNumbersReply = exports.transformRedisJsonNullReply = exports.transformRedisJsonReply = exports.transformRedisJsonArgument = void 0;
    var ARRAPPEND = require_ARRAPPEND();
    var ARRINDEX = require_ARRINDEX();
    var ARRINSERT = require_ARRINSERT();
    var ARRLEN = require_ARRLEN();
    var ARRPOP = require_ARRPOP();
    var ARRTRIM = require_ARRTRIM();
    var DEBUG_MEMORY = require_DEBUG_MEMORY();
    var DEL = require_DEL3();
    var FORGET = require_FORGET();
    var GET = require_GET2();
    var MGET = require_MGET2();
    var NUMINCRBY = require_NUMINCRBY();
    var NUMMULTBY = require_NUMMULTBY();
    var OBJKEYS = require_OBJKEYS();
    var OBJLEN = require_OBJLEN();
    var RESP = require_RESP();
    var SET = require_SET2();
    var STRAPPEND = require_STRAPPEND();
    var STRLEN = require_STRLEN2();
    var TYPE = require_TYPE2();
    exports.default = {
      ARRAPPEND,
      arrAppend: ARRAPPEND,
      ARRINDEX,
      arrIndex: ARRINDEX,
      ARRINSERT,
      arrInsert: ARRINSERT,
      ARRLEN,
      arrLen: ARRLEN,
      ARRPOP,
      arrPop: ARRPOP,
      ARRTRIM,
      arrTrim: ARRTRIM,
      DEBUG_MEMORY,
      debugMemory: DEBUG_MEMORY,
      DEL,
      del: DEL,
      FORGET,
      forget: FORGET,
      GET,
      get: GET,
      MGET,
      mGet: MGET,
      NUMINCRBY,
      numIncrBy: NUMINCRBY,
      NUMMULTBY,
      numMultBy: NUMMULTBY,
      OBJKEYS,
      objKeys: OBJKEYS,
      OBJLEN,
      objLen: OBJLEN,
      RESP,
      resp: RESP,
      SET,
      set: SET,
      STRAPPEND,
      strAppend: STRAPPEND,
      STRLEN,
      strLen: STRLEN,
      TYPE,
      type: TYPE
    };
    function transformRedisJsonArgument(json) {
      return JSON.stringify(json);
    }
    exports.transformRedisJsonArgument = transformRedisJsonArgument;
    function transformRedisJsonReply(json) {
      return JSON.parse(json);
    }
    exports.transformRedisJsonReply = transformRedisJsonReply;
    function transformRedisJsonNullReply(json) {
      if (json === null)
        return null;
      return transformRedisJsonReply(json);
    }
    exports.transformRedisJsonNullReply = transformRedisJsonNullReply;
    function transformNumbersReply(reply) {
      return JSON.parse(reply);
    }
    exports.transformNumbersReply = transformNumbersReply;
  }
});

// node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/index.js
var require_dist4 = __commonJS({
  "node_modules/.pnpm/@node-redis+json@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/json/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = void 0;
    var commands_1 = require_commands5();
    Object.defineProperty(exports, "default", { enumerable: true, get: function() {
      return commands_1.default;
    } });
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/_LIST.js
var require_LIST3 = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/_LIST.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments() {
      return ["FT._LIST"];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/ALTER.js
var require_ALTER = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/ALTER.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    var _1 = require_commands6();
    function transformArguments(index, schema) {
      const args = ["FT.ALTER", index, "SCHEMA", "ADD"];
      (0, _1.pushSchema)(args, schema);
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/AGGREGATE.js
var require_AGGREGATE = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/AGGREGATE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.pushAggregatehOptions = exports.transformArguments = exports.AggregateGroupByReducers = exports.AggregateSteps = void 0;
    var generic_transformers_1 = require_generic_transformers();
    var _1 = require_commands6();
    var AggregateSteps;
    (function(AggregateSteps2) {
      AggregateSteps2["GROUPBY"] = "GROUPBY";
      AggregateSteps2["SORTBY"] = "SORTBY";
      AggregateSteps2["APPLY"] = "APPLY";
      AggregateSteps2["LIMIT"] = "LIMIT";
      AggregateSteps2["FILTER"] = "FILTER";
    })(AggregateSteps = exports.AggregateSteps || (exports.AggregateSteps = {}));
    var AggregateGroupByReducers;
    (function(AggregateGroupByReducers2) {
      AggregateGroupByReducers2["COUNT"] = "COUNT";
      AggregateGroupByReducers2["COUNT_DISTINCT"] = "COUNT_DISTINCT";
      AggregateGroupByReducers2["COUNT_DISTINCTISH"] = "COUNT_DISTINCTISH";
      AggregateGroupByReducers2["SUM"] = "SUM";
      AggregateGroupByReducers2["MIN"] = "MIN";
      AggregateGroupByReducers2["MAX"] = "MAX";
      AggregateGroupByReducers2["AVG"] = "AVG";
      AggregateGroupByReducers2["STDDEV"] = "STDDEV";
      AggregateGroupByReducers2["QUANTILE"] = "QUANTILE";
      AggregateGroupByReducers2["TOLIST"] = "TOLIST";
      AggregateGroupByReducers2["TO_LIST"] = "TOLIST";
      AggregateGroupByReducers2["FIRST_VALUE"] = "FIRST_VALUE";
      AggregateGroupByReducers2["RANDOM_SAMPLE"] = "RANDOM_SAMPLE";
    })(AggregateGroupByReducers = exports.AggregateGroupByReducers || (exports.AggregateGroupByReducers = {}));
    function transformArguments(index, query, options) {
      const args = ["FT.AGGREGATE", index, query];
      pushAggregatehOptions(args, options);
      return args;
    }
    exports.transformArguments = transformArguments;
    function pushAggregatehOptions(args, options) {
      if (options === null || options === void 0 ? void 0 : options.VERBATIM) {
        args.push("VERBATIM");
      }
      if (options === null || options === void 0 ? void 0 : options.LOAD) {
        args.push("LOAD");
        (0, _1.pushArgumentsWithLength)(args, () => {
          if (Array.isArray(options.LOAD)) {
            for (const load2 of options.LOAD) {
              pushLoadField(args, load2);
            }
          } else {
            pushLoadField(args, options.LOAD);
          }
        });
      }
      if (options === null || options === void 0 ? void 0 : options.STEPS) {
        for (const step of options.STEPS) {
          switch (step.type) {
            case AggregateSteps.GROUPBY:
              args.push("GROUPBY");
              if (!step.properties) {
                args.push("0");
              } else {
                (0, generic_transformers_1.pushVerdictArgument)(args, step.properties);
              }
              if (Array.isArray(step.REDUCE)) {
                for (const reducer of step.REDUCE) {
                  pushGroupByReducer(args, reducer);
                }
              } else {
                pushGroupByReducer(args, step.REDUCE);
              }
              break;
            case AggregateSteps.SORTBY:
              (0, _1.pushSortByArguments)(args, "SORTBY", step.BY);
              if (step.MAX) {
                args.push("MAX", step.MAX.toString());
              }
              break;
            case AggregateSteps.APPLY:
              args.push("APPLY", step.expression, "AS", step.AS);
              break;
            case AggregateSteps.LIMIT:
              args.push("LIMIT", step.from.toString(), step.size.toString());
              break;
            case AggregateSteps.FILTER:
              args.push("FILTER", step.expression);
              break;
          }
        }
      }
      return args;
    }
    exports.pushAggregatehOptions = pushAggregatehOptions;
    function pushLoadField(args, toLoad) {
      if (typeof toLoad === "string") {
        args.push(toLoad);
      } else {
        args.push(toLoad.identifier);
        if (toLoad.AS) {
          args.push("AS", toLoad.AS);
        }
      }
    }
    function pushGroupByReducer(args, reducer) {
      args.push("REDUCE", reducer.type);
      switch (reducer.type) {
        case AggregateGroupByReducers.COUNT:
          args.push("0");
          break;
        case AggregateGroupByReducers.COUNT_DISTINCT:
        case AggregateGroupByReducers.COUNT_DISTINCTISH:
        case AggregateGroupByReducers.SUM:
        case AggregateGroupByReducers.MIN:
        case AggregateGroupByReducers.MAX:
        case AggregateGroupByReducers.AVG:
        case AggregateGroupByReducers.STDDEV:
        case AggregateGroupByReducers.TOLIST:
          args.push("1", reducer.property);
          break;
        case AggregateGroupByReducers.QUANTILE:
          args.push("2", reducer.property, reducer.quantile.toString());
          break;
        case AggregateGroupByReducers.FIRST_VALUE: {
          (0, _1.pushArgumentsWithLength)(args, () => {
            args.push(reducer.property);
            if (reducer.BY) {
              args.push("BY");
              if (typeof reducer.BY === "string") {
                args.push(reducer.BY);
              } else {
                args.push(reducer.BY.property);
                if (reducer.BY.direction) {
                  args.push(reducer.BY.direction);
                }
              }
            }
          });
          break;
        }
        case AggregateGroupByReducers.RANDOM_SAMPLE:
          args.push("2", reducer.property, reducer.sampleSize.toString());
          break;
      }
      if (reducer.AS) {
        args.push("AS", reducer.AS);
      }
    }
    function transformReply(rawReply) {
      const results = [];
      for (let i2 = 1; i2 < rawReply.length; i2++) {
        results.push((0, generic_transformers_1.transformTuplesReply)(rawReply[i2]));
      }
      return {
        total: rawReply[0],
        results
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/ALIASADD.js
var require_ALIASADD = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/ALIASADD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(name, index) {
      return ["FT.ALIASADD", name, index];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/ALIASDEL.js
var require_ALIASDEL = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/ALIASDEL.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(name, index) {
      return ["FT.ALIASDEL", name, index];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/ALIASUPDATE.js
var require_ALIASUPDATE = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/ALIASUPDATE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(name, index) {
      return ["FT.ALIASUPDATE", name, index];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/CONFIG_GET.js
var require_CONFIG_GET3 = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/CONFIG_GET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = void 0;
    function transformArguments(option) {
      return ["FT.CONFIG", "GET", option];
    }
    exports.transformArguments = transformArguments;
    function transformReply(rawReply) {
      const transformedReply = /* @__PURE__ */ Object.create(null);
      for (const [key2, value] of rawReply) {
        transformedReply[key2] = value;
      }
      return transformedReply;
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/CONFIG_SET.js
var require_CONFIG_SET3 = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/CONFIG_SET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(option, value) {
      return ["FT.CONFIG", "SET", option, value];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/CREATE.js
var require_CREATE = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/CREATE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    var generic_transformers_1 = require_generic_transformers();
    var _1 = require_commands6();
    function transformArguments(index, schema, options) {
      const args = ["FT.CREATE", index];
      if (options === null || options === void 0 ? void 0 : options.ON) {
        args.push("ON", options.ON);
      }
      (0, generic_transformers_1.pushOptionalVerdictArgument)(args, "PREFIX", options === null || options === void 0 ? void 0 : options.PREFIX);
      if (options === null || options === void 0 ? void 0 : options.FILTER) {
        args.push("FILTER", options.FILTER);
      }
      if (options === null || options === void 0 ? void 0 : options.LANGUAGE) {
        args.push("LANGUAGE", options.LANGUAGE);
      }
      if (options === null || options === void 0 ? void 0 : options.LANGUAGE_FIELD) {
        args.push("LANGUAGE_FIELD", options.LANGUAGE_FIELD);
      }
      if (options === null || options === void 0 ? void 0 : options.SCORE) {
        args.push("SCORE", options.SCORE.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.SCORE_FIELD) {
        args.push("SCORE_FIELD", options.SCORE_FIELD);
      }
      if (options === null || options === void 0 ? void 0 : options.MAXTEXTFIELDS) {
        args.push("MAXTEXTFIELDS");
      }
      if (options === null || options === void 0 ? void 0 : options.TEMPORARY) {
        args.push("TEMPORARY", options.TEMPORARY.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.NOOFFSETS) {
        args.push("NOOFFSETS");
      }
      if (options === null || options === void 0 ? void 0 : options.NOHL) {
        args.push("NOHL");
      }
      if (options === null || options === void 0 ? void 0 : options.NOFIELDS) {
        args.push("NOFIELDS");
      }
      if (options === null || options === void 0 ? void 0 : options.NOFREQS) {
        args.push("NOFREQS");
      }
      if (options === null || options === void 0 ? void 0 : options.SKIPINITIALSCAN) {
        args.push("SKIPINITIALSCAN");
      }
      (0, generic_transformers_1.pushOptionalVerdictArgument)(args, "STOPWORDS", options === null || options === void 0 ? void 0 : options.STOPWORDS);
      args.push("SCHEMA");
      (0, _1.pushSchema)(args, schema);
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/DICTADD.js
var require_DICTADD = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/DICTADD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    var generic_transformers_1 = require_generic_transformers();
    function transformArguments(dictionary, term) {
      return (0, generic_transformers_1.pushVerdictArguments)(["FT.DICTADD", dictionary], term);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/DICTDEL.js
var require_DICTDEL = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/DICTDEL.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    var generic_transformers_1 = require_generic_transformers();
    function transformArguments(dictionary, term) {
      return (0, generic_transformers_1.pushVerdictArguments)(["FT.DICTDEL", dictionary], term);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/DICTDUMP.js
var require_DICTDUMP = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/DICTDUMP.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(dictionary) {
      return ["FT.DICTDUMP", dictionary];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/DROPINDEX.js
var require_DROPINDEX = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/DROPINDEX.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(index, options) {
      const args = ["FT.DROPINDEX", index];
      if (options === null || options === void 0 ? void 0 : options.DD) {
        args.push("DD");
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/EXPLAIN.js
var require_EXPLAIN2 = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/EXPLAIN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = void 0;
    exports.IS_READ_ONLY = true;
    function transformArguments(index, query) {
      return ["FT.EXPLAIN", index, query];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/EXPLAINCLI.js
var require_EXPLAINCLI = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/EXPLAINCLI.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = void 0;
    exports.IS_READ_ONLY = true;
    function transformArguments(index, query) {
      return ["FT.EXPLAINCLI", index, query];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/INFO.js
var require_INFO6 = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/INFO.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = void 0;
    function transformArguments(index) {
      return ["FT.INFO", index];
    }
    exports.transformArguments = transformArguments;
    function transformReply(rawReply) {
      return {
        indexName: rawReply[1],
        indexOptions: rawReply[3],
        indexDefinition: {
          keyType: rawReply[5][1],
          prefixes: rawReply[5][3],
          defaultScore: rawReply[5][5]
        },
        attributes: rawReply[7],
        numDocs: rawReply[9],
        maxDocId: rawReply[11],
        numTerms: rawReply[13],
        numRecords: rawReply[15],
        invertedSzMb: rawReply[17],
        totalInvertedIndexBlocks: rawReply[19],
        offsetVectorsSzMb: rawReply[21],
        docTableSizeMb: rawReply[23],
        sortableValuesSizeMb: rawReply[25],
        keyTableSizeMb: rawReply[27],
        recordsPerDocAvg: rawReply[29],
        bytesPerRecordAvg: rawReply[31],
        offsetsPerTermAvg: rawReply[33],
        offsetBitsPerRecordAvg: rawReply[35],
        hashIndexingFailures: rawReply[37],
        indexing: rawReply[39],
        percentIndexed: rawReply[41],
        gcStats: {
          bytesCollected: rawReply[43][1],
          totalMsRun: rawReply[43][3],
          totalCycles: rawReply[43][5],
          averageCycleTimeMs: rawReply[43][7],
          lastRunTimeMs: rawReply[43][9],
          gcNumericTreesMissed: rawReply[43][11],
          gcBlocksDenied: rawReply[43][13]
        },
        cursorStats: {
          globalIdle: rawReply[45][1],
          globalTotal: rawReply[45][3],
          indexCapacity: rawReply[45][5],
          idnexTotal: rawReply[45][7]
        }
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SEARCH.js
var require_SEARCH = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SEARCH.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var generic_transformers_1 = require_generic_transformers();
    var _1 = require_commands6();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(index, query, options) {
      const args = ["FT.SEARCH", index, query];
      (0, _1.pushSearchOptions)(args, options);
      return args;
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      const documents = [];
      for (let i2 = 1; i2 < reply.length; i2 += 2) {
        const tuples = reply[i2 + 1];
        documents.push({
          id: reply[i2],
          value: tuples.length === 2 && tuples[0] === "$" ? JSON.parse(tuples[1]) : (0, generic_transformers_1.transformTuplesReply)(tuples)
        });
      }
      return {
        total: reply[0],
        documents
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/PROFILE_SEARCH.js
var require_PROFILE_SEARCH = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/PROFILE_SEARCH.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
    var SEARCH_1 = require_SEARCH();
    var _1 = require_commands6();
    exports.IS_READ_ONLY = true;
    function transformArguments(index, query, options) {
      const args = ["FT.PROFILE", index, "SEARCH"];
      if (options === null || options === void 0 ? void 0 : options.LIMITED) {
        args.push("LIMITED");
      }
      args.push("QUERY", query);
      (0, _1.pushSearchOptions)(args, options);
      return args;
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return {
        results: (0, SEARCH_1.transformReply)(reply[0]),
        profile: (0, _1.transformProfile)(reply[1])
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/PROFILE_AGGREGATE.js
var require_PROFILE_AGGREGATE = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/PROFILE_AGGREGATE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
    var AGGREGATE_1 = require_AGGREGATE();
    var _1 = require_commands6();
    exports.IS_READ_ONLY = true;
    function transformArguments(index, query, options) {
      const args = ["FT.PROFILE", index, "AGGREGATE"];
      if (options === null || options === void 0 ? void 0 : options.LIMITED) {
        args.push("LIMITED");
      }
      args.push("QUERY", query);
      (0, AGGREGATE_1.pushAggregatehOptions)(args, options);
      return args;
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return {
        results: (0, AGGREGATE_1.transformReply)(reply[0]),
        profile: (0, _1.transformProfile)(reply[1])
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SPELLCHECK.js
var require_SPELLCHECK = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SPELLCHECK.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = void 0;
    function transformArguments(index, query, options) {
      const args = ["FT.SPELLCHECK", index, query];
      if (options === null || options === void 0 ? void 0 : options.DISTANCE) {
        args.push("DISTANCE", options.DISTANCE.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.TERMS) {
        if (Array.isArray(options.TERMS)) {
          for (const term of options.TERMS) {
            pushTerms(args, term);
          }
        } else {
          pushTerms(args, options.TERMS);
        }
      }
      return args;
    }
    exports.transformArguments = transformArguments;
    function pushTerms(args, { mode, dictionary }) {
      args.push("TERMS", mode, dictionary);
    }
    function transformReply(rawReply) {
      return rawReply.map(([, term, suggestions]) => ({
        term,
        suggestions: suggestions.map(([score, suggestion]) => ({
          score: Number(score),
          suggestion
        }))
      }));
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SUGADD.js
var require_SUGADD = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SUGADD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(key2, string, score, options) {
      const args = ["FT.SUGADD", key2, string, score.toString()];
      if (options === null || options === void 0 ? void 0 : options.INCR) {
        args.push("INCR");
      }
      if (options === null || options === void 0 ? void 0 : options.PAYLOAD) {
        args.push("PAYLOAD", options.PAYLOAD);
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SUGDEL.js
var require_SUGDEL = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SUGDEL.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = void 0;
    function transformArguments(key2, string) {
      return ["FT.SUGDEL", key2, string];
    }
    exports.transformArguments = transformArguments;
    var generic_transformers_1 = require_generic_transformers();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return generic_transformers_1.transformBooleanReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SUGGET.js
var require_SUGGET = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SUGGET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = void 0;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, prefix, options) {
      const args = ["FT.SUGGET", key2, prefix];
      if (options === null || options === void 0 ? void 0 : options.FUZZY) {
        args.push("FUZZY");
      }
      if (options === null || options === void 0 ? void 0 : options.MAX) {
        args.push("MAX", options.MAX.toString());
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SUGGET_WITHPAYLOADS.js
var require_SUGGET_WITHPAYLOADS = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SUGGET_WITHPAYLOADS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
    var SUGGET_1 = require_SUGGET();
    var SUGGET_2 = require_SUGGET();
    Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
      return SUGGET_2.IS_READ_ONLY;
    } });
    function transformArguments(key2, prefix, options) {
      return [
        ...(0, SUGGET_1.transformArguments)(key2, prefix, options),
        "WITHPAYLOADS"
      ];
    }
    exports.transformArguments = transformArguments;
    function transformReply(rawReply) {
      if (rawReply === null)
        return null;
      const transformedReply = [];
      for (let i2 = 0; i2 < rawReply.length; i2 += 2) {
        transformedReply.push({
          suggestion: rawReply[i2],
          payload: rawReply[i2 + 1]
        });
      }
      return transformedReply;
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SUGGET_WITHSCORES_WITHPAYLOADS.js
var require_SUGGET_WITHSCORES_WITHPAYLOADS = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SUGGET_WITHSCORES_WITHPAYLOADS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
    var SUGGET_1 = require_SUGGET();
    var SUGGET_2 = require_SUGGET();
    Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
      return SUGGET_2.IS_READ_ONLY;
    } });
    function transformArguments(key2, prefix, options) {
      return [
        ...(0, SUGGET_1.transformArguments)(key2, prefix, options),
        "WITHSCORES",
        "WITHPAYLOADS"
      ];
    }
    exports.transformArguments = transformArguments;
    function transformReply(rawReply) {
      if (rawReply === null)
        return null;
      const transformedReply = [];
      for (let i2 = 0; i2 < rawReply.length; i2 += 3) {
        transformedReply.push({
          suggestion: rawReply[i2],
          score: Number(rawReply[i2 + 1]),
          payload: rawReply[i2 + 2]
        });
      }
      return transformedReply;
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SUGGET_WITHSCORES.js
var require_SUGGET_WITHSCORES = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SUGGET_WITHSCORES.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
    var SUGGET_1 = require_SUGGET();
    var SUGGET_2 = require_SUGGET();
    Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
      return SUGGET_2.IS_READ_ONLY;
    } });
    function transformArguments(key2, prefix, options) {
      return [
        ...(0, SUGGET_1.transformArguments)(key2, prefix, options),
        "WITHSCORES"
      ];
    }
    exports.transformArguments = transformArguments;
    function transformReply(rawReply) {
      if (rawReply === null)
        return null;
      const transformedReply = [];
      for (let i2 = 0; i2 < rawReply.length; i2 += 2) {
        transformedReply.push({
          suggestion: rawReply[i2],
          score: Number(rawReply[i2 + 1])
        });
      }
      return transformedReply;
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SUGLEN.js
var require_SUGLEN = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SUGLEN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = void 0;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2) {
      return ["FT.SUGLEN", key2];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SYNDUMP.js
var require_SYNDUMP = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SYNDUMP.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(index) {
      return ["FT.SYNDUMP", index];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SYNUPDATE.js
var require_SYNUPDATE = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/SYNUPDATE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    var generic_transformers_1 = require_generic_transformers();
    function transformArguments(index, groupId, terms, options) {
      const args = ["FT.SYNUPDATE", index, groupId];
      if (options === null || options === void 0 ? void 0 : options.SKIPINITIALSCAN) {
        args.push("SKIPINITIALSCAN");
      }
      return (0, generic_transformers_1.pushVerdictArguments)(args, terms);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/TAGVALS.js
var require_TAGVALS = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/TAGVALS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = void 0;
    function transformArguments(index, fieldName) {
      return ["FT.TAGVALS", index, fieldName];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/index.js
var require_commands6 = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/commands/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformProfile = exports.pushSearchOptions = exports.pushSchema = exports.SchemaTextFieldPhonetics = exports.SchemaFieldTypes = exports.pushArgumentsWithLength = exports.pushSortByArguments = exports.pushSortByProperty = exports.RedisSearchLanguages = void 0;
    var _LIST = require_LIST3();
    var ALTER = require_ALTER();
    var AGGREGATE = require_AGGREGATE();
    var ALIASADD = require_ALIASADD();
    var ALIASDEL = require_ALIASDEL();
    var ALIASUPDATE = require_ALIASUPDATE();
    var CONFIG_GET = require_CONFIG_GET3();
    var CONFIG_SET = require_CONFIG_SET3();
    var CREATE = require_CREATE();
    var DICTADD = require_DICTADD();
    var DICTDEL = require_DICTDEL();
    var DICTDUMP = require_DICTDUMP();
    var DROPINDEX = require_DROPINDEX();
    var EXPLAIN = require_EXPLAIN2();
    var EXPLAINCLI = require_EXPLAINCLI();
    var INFO = require_INFO6();
    var PROFILESEARCH = require_PROFILE_SEARCH();
    var PROFILEAGGREGATE = require_PROFILE_AGGREGATE();
    var SEARCH = require_SEARCH();
    var SPELLCHECK = require_SPELLCHECK();
    var SUGADD = require_SUGADD();
    var SUGDEL = require_SUGDEL();
    var SUGGET_WITHPAYLOADS = require_SUGGET_WITHPAYLOADS();
    var SUGGET_WITHSCORES_WITHPAYLOADS = require_SUGGET_WITHSCORES_WITHPAYLOADS();
    var SUGGET_WITHSCORES = require_SUGGET_WITHSCORES();
    var SUGGET = require_SUGGET();
    var SUGLEN = require_SUGLEN();
    var SYNDUMP = require_SYNDUMP();
    var SYNUPDATE = require_SYNUPDATE();
    var TAGVALS = require_TAGVALS();
    var generic_transformers_1 = require_generic_transformers();
    exports.default = {
      _LIST,
      _list: _LIST,
      ALTER,
      alter: ALTER,
      AGGREGATE,
      aggregate: AGGREGATE,
      ALIASADD,
      aliasAdd: ALIASADD,
      ALIASDEL,
      aliasDel: ALIASDEL,
      ALIASUPDATE,
      aliasUpdate: ALIASUPDATE,
      CONFIG_GET,
      configGet: CONFIG_GET,
      CONFIG_SET,
      configSet: CONFIG_SET,
      CREATE,
      create: CREATE,
      DICTADD,
      dictAdd: DICTADD,
      DICTDEL,
      dictDel: DICTDEL,
      DICTDUMP,
      dictDump: DICTDUMP,
      DROPINDEX,
      dropIndex: DROPINDEX,
      EXPLAIN,
      explain: EXPLAIN,
      EXPLAINCLI,
      explainCli: EXPLAINCLI,
      INFO,
      info: INFO,
      PROFILESEARCH,
      profileSearch: PROFILESEARCH,
      PROFILEAGGREGATE,
      profileAggregate: PROFILEAGGREGATE,
      SEARCH,
      search: SEARCH,
      SPELLCHECK,
      spellCheck: SPELLCHECK,
      SUGADD,
      sugAdd: SUGADD,
      SUGDEL,
      sugDel: SUGDEL,
      SUGGET_WITHPAYLOADS,
      sugGetWithPayloads: SUGGET_WITHPAYLOADS,
      SUGGET_WITHSCORES_WITHPAYLOADS,
      sugGetWithScoresWithPayloads: SUGGET_WITHSCORES_WITHPAYLOADS,
      SUGGET_WITHSCORES,
      sugGetWithScores: SUGGET_WITHSCORES,
      SUGGET,
      sugGet: SUGGET,
      SUGLEN,
      sugLen: SUGLEN,
      SYNDUMP,
      synDump: SYNDUMP,
      SYNUPDATE,
      synUpdate: SYNUPDATE,
      TAGVALS,
      tagVals: TAGVALS
    };
    var RedisSearchLanguages;
    (function(RedisSearchLanguages2) {
      RedisSearchLanguages2["ARABIC"] = "Arabic";
      RedisSearchLanguages2["BASQUE"] = "Basque";
      RedisSearchLanguages2["CATALANA"] = "Catalan";
      RedisSearchLanguages2["DANISH"] = "Danish";
      RedisSearchLanguages2["DUTCH"] = "Dutch";
      RedisSearchLanguages2["ENGLISH"] = "English";
      RedisSearchLanguages2["FINNISH"] = "Finnish";
      RedisSearchLanguages2["FRENCH"] = "French";
      RedisSearchLanguages2["GERMAN"] = "German";
      RedisSearchLanguages2["GREEK"] = "Greek";
      RedisSearchLanguages2["HUNGARIAN"] = "Hungarian";
      RedisSearchLanguages2["INDONESAIN"] = "Indonesian";
      RedisSearchLanguages2["IRISH"] = "Irish";
      RedisSearchLanguages2["ITALIAN"] = "Italian";
      RedisSearchLanguages2["LITHUANIAN"] = "Lithuanian";
      RedisSearchLanguages2["NEPALI"] = "Nepali";
      RedisSearchLanguages2["NORWEIGAN"] = "Norwegian";
      RedisSearchLanguages2["PORTUGUESE"] = "Portuguese";
      RedisSearchLanguages2["ROMANIAN"] = "Romanian";
      RedisSearchLanguages2["RUSSIAN"] = "Russian";
      RedisSearchLanguages2["SPANISH"] = "Spanish";
      RedisSearchLanguages2["SWEDISH"] = "Swedish";
      RedisSearchLanguages2["TAMIL"] = "Tamil";
      RedisSearchLanguages2["TURKISH"] = "Turkish";
      RedisSearchLanguages2["CHINESE"] = "Chinese";
    })(RedisSearchLanguages = exports.RedisSearchLanguages || (exports.RedisSearchLanguages = {}));
    function pushSortByProperty(args, sortBy) {
      if (typeof sortBy === "string") {
        args.push(sortBy);
      } else {
        args.push(sortBy.BY);
        if (sortBy.DIRECTION) {
          args.push(sortBy.DIRECTION);
        }
      }
    }
    exports.pushSortByProperty = pushSortByProperty;
    function pushSortByArguments(args, name, sortBy) {
      const lengthBefore = args.push(name, "");
      if (Array.isArray(sortBy)) {
        for (const field of sortBy) {
          pushSortByProperty(args, field);
        }
      } else {
        pushSortByProperty(args, sortBy);
      }
      args[lengthBefore - 1] = (args.length - lengthBefore).toString();
      return args;
    }
    exports.pushSortByArguments = pushSortByArguments;
    function pushArgumentsWithLength(args, fn) {
      const lengthIndex = args.push("") - 1;
      fn(args);
      args[lengthIndex] = (args.length - lengthIndex - 1).toString();
      return args;
    }
    exports.pushArgumentsWithLength = pushArgumentsWithLength;
    var SchemaFieldTypes;
    (function(SchemaFieldTypes2) {
      SchemaFieldTypes2["TEXT"] = "TEXT";
      SchemaFieldTypes2["NUMERIC"] = "NUMERIC";
      SchemaFieldTypes2["GEO"] = "GEO";
      SchemaFieldTypes2["TAG"] = "TAG";
    })(SchemaFieldTypes = exports.SchemaFieldTypes || (exports.SchemaFieldTypes = {}));
    var SchemaTextFieldPhonetics;
    (function(SchemaTextFieldPhonetics2) {
      SchemaTextFieldPhonetics2["DM_EN"] = "dm:en";
      SchemaTextFieldPhonetics2["DM_FR"] = "dm:fr";
      SchemaTextFieldPhonetics2["FM_PT"] = "dm:pt";
      SchemaTextFieldPhonetics2["DM_ES"] = "dm:es";
    })(SchemaTextFieldPhonetics = exports.SchemaTextFieldPhonetics || (exports.SchemaTextFieldPhonetics = {}));
    function pushSchema(args, schema) {
      for (const [field, fieldOptions] of Object.entries(schema)) {
        args.push(field);
        if (typeof fieldOptions === "string") {
          args.push(fieldOptions);
          continue;
        }
        if (fieldOptions.AS) {
          args.push("AS", fieldOptions.AS);
        }
        args.push(fieldOptions.type);
        switch (fieldOptions.type) {
          case SchemaFieldTypes.TEXT:
            if (fieldOptions.NOSTEM) {
              args.push("NOSTEM");
            }
            if (fieldOptions.WEIGHT) {
              args.push("WEIGHT", fieldOptions.WEIGHT.toString());
            }
            if (fieldOptions.PHONETIC) {
              args.push("PHONETIC", fieldOptions.PHONETIC);
            }
            break;
          case SchemaFieldTypes.TAG:
            if (fieldOptions.SEPARATOR) {
              args.push("SEPARATOR", fieldOptions.SEPARATOR);
            }
            if (fieldOptions.CASESENSITIVE) {
              args.push("CASESENSITIVE");
            }
            break;
        }
        if (fieldOptions.SORTABLE) {
          args.push("SORTABLE");
          if (fieldOptions.SORTABLE === "UNF") {
            args.push("UNF");
          }
        }
        if (fieldOptions.NOINDEX) {
          args.push("NOINDEX");
        }
      }
    }
    exports.pushSchema = pushSchema;
    function pushSearchOptions(args, options) {
      if (options === null || options === void 0 ? void 0 : options.VERBATIM) {
        args.push("VERBATIM");
      }
      if (options === null || options === void 0 ? void 0 : options.NOSTOPWORDS) {
        args.push("NOSTOPWORDS");
      }
      (0, generic_transformers_1.pushOptionalVerdictArgument)(args, "INKEYS", options === null || options === void 0 ? void 0 : options.INKEYS);
      (0, generic_transformers_1.pushOptionalVerdictArgument)(args, "INFIELDS", options === null || options === void 0 ? void 0 : options.INFIELDS);
      (0, generic_transformers_1.pushOptionalVerdictArgument)(args, "RETURN", options === null || options === void 0 ? void 0 : options.RETURN);
      if (options === null || options === void 0 ? void 0 : options.SUMMARIZE) {
        args.push("SUMMARIZE");
        if (typeof options.SUMMARIZE === "object") {
          if (options.SUMMARIZE.FIELDS) {
            args.push("FIELDS");
            (0, generic_transformers_1.pushVerdictArgument)(args, options.SUMMARIZE.FIELDS);
          }
          if (options.SUMMARIZE.FRAGS) {
            args.push("FRAGS", options.SUMMARIZE.FRAGS.toString());
          }
          if (options.SUMMARIZE.LEN) {
            args.push("LEN", options.SUMMARIZE.LEN.toString());
          }
          if (options.SUMMARIZE.SEPARATOR) {
            args.push("SEPARATOR", options.SUMMARIZE.SEPARATOR);
          }
        }
      }
      if (options === null || options === void 0 ? void 0 : options.HIGHLIGHT) {
        args.push("HIGHLIGHT");
        if (typeof options.HIGHLIGHT === "object") {
          if (options.HIGHLIGHT.FIELDS) {
            args.push("FIELDS");
            (0, generic_transformers_1.pushVerdictArgument)(args, options.HIGHLIGHT.FIELDS);
          }
          if (options.HIGHLIGHT.TAGS) {
            args.push("TAGS", options.HIGHLIGHT.TAGS.open, options.HIGHLIGHT.TAGS.close);
          }
        }
      }
      if (options === null || options === void 0 ? void 0 : options.SLOP) {
        args.push("SLOP", options.SLOP.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.INORDER) {
        args.push("INORDER");
      }
      if (options === null || options === void 0 ? void 0 : options.LANGUAGE) {
        args.push("LANGUAGE", options.LANGUAGE);
      }
      if (options === null || options === void 0 ? void 0 : options.EXPANDER) {
        args.push("EXPANDER", options.EXPANDER);
      }
      if (options === null || options === void 0 ? void 0 : options.SCORER) {
        args.push("SCORER", options.SCORER);
      }
      if (options === null || options === void 0 ? void 0 : options.SORTBY) {
        args.push("SORTBY");
        pushSortByProperty(args, options.SORTBY);
      }
      if (options === null || options === void 0 ? void 0 : options.LIMIT) {
        args.push("LIMIT", options.LIMIT.from.toString(), options.LIMIT.size.toString());
      }
      return args;
    }
    exports.pushSearchOptions = pushSearchOptions;
    function transformProfile(reply) {
      return {
        totalProfileTime: reply[0][1],
        parsingTime: reply[1][1],
        pipelineCreationTime: reply[2][1],
        iteratorsProfile: transformIterators(reply[3][1])
      };
    }
    exports.transformProfile = transformProfile;
    function transformIterators(IteratorsProfile) {
      var res = {};
      for (let i2 = 0; i2 < IteratorsProfile.length; i2 += 2) {
        const value = IteratorsProfile[i2 + 1];
        switch (IteratorsProfile[i2]) {
          case "Type":
            res.type = value;
            break;
          case "Counter":
            res.counter = value;
            break;
          case "Time":
            res.time = value;
            break;
          case "Query type":
            res.queryType = value;
            break;
          case "Child iterators":
            res.childIterators = value.map(transformChildIterators);
            break;
        }
      }
      return res;
    }
    function transformChildIterators(IteratorsProfile) {
      var res = {};
      for (let i2 = 1; i2 < IteratorsProfile.length; i2 += 2) {
        const value = IteratorsProfile[i2 + 1];
        switch (IteratorsProfile[i2]) {
          case "Type":
            res.type = value;
            break;
          case "Counter":
            res.counter = value;
            break;
          case "Time":
            res.time = value;
            break;
          case "Size":
            res.size = value;
            break;
          case "Term":
            res.term = value;
            break;
          case "Child iterators":
            res.childIterators = value.map(transformChildIterators);
            break;
        }
      }
      return res;
    }
  }
});

// node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/index.js
var require_dist5 = __commonJS({
  "node_modules/.pnpm/@node-redis+search@1.0.3_@node-redis+client@1.0.4/node_modules/@node-redis/search/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AggregateGroupByReducers = exports.AggregateSteps = exports.SchemaTextFieldPhonetics = exports.SchemaFieldTypes = exports.default = void 0;
    var commands_1 = require_commands6();
    Object.defineProperty(exports, "default", { enumerable: true, get: function() {
      return commands_1.default;
    } });
    var commands_2 = require_commands6();
    Object.defineProperty(exports, "SchemaFieldTypes", { enumerable: true, get: function() {
      return commands_2.SchemaFieldTypes;
    } });
    Object.defineProperty(exports, "SchemaTextFieldPhonetics", { enumerable: true, get: function() {
      return commands_2.SchemaTextFieldPhonetics;
    } });
    var AGGREGATE_1 = require_AGGREGATE();
    Object.defineProperty(exports, "AggregateSteps", { enumerable: true, get: function() {
      return AGGREGATE_1.AggregateSteps;
    } });
    Object.defineProperty(exports, "AggregateGroupByReducers", { enumerable: true, get: function() {
      return AGGREGATE_1.AggregateGroupByReducers;
    } });
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/ADD.js
var require_ADD4 = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/ADD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var _1 = require_commands7();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, timestamp, value, options) {
      const args = [
        "TS.ADD",
        key2,
        (0, _1.transformTimestampArgument)(timestamp),
        value.toString()
      ];
      (0, _1.pushRetentionArgument)(args, options === null || options === void 0 ? void 0 : options.RETENTION);
      (0, _1.pushEncodingArgument)(args, options === null || options === void 0 ? void 0 : options.ENCODING);
      (0, _1.pushChunkSizeArgument)(args, options === null || options === void 0 ? void 0 : options.CHUNK_SIZE);
      if (options === null || options === void 0 ? void 0 : options.ON_DUPLICATE) {
        args.push("ON_DUPLICATE", options.ON_DUPLICATE);
      }
      (0, _1.pushLabelsArgument)(args, options === null || options === void 0 ? void 0 : options.LABELS);
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/ALTER.js
var require_ALTER2 = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/ALTER.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var _1 = require_commands7();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, options) {
      const args = ["TS.ALTER", key2];
      (0, _1.pushRetentionArgument)(args, options === null || options === void 0 ? void 0 : options.RETENTION);
      (0, _1.pushLabelsArgument)(args, options === null || options === void 0 ? void 0 : options.LABELS);
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/CREATE.js
var require_CREATE2 = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/CREATE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var _1 = require_commands7();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, options) {
      const args = ["TS.CREATE", key2];
      (0, _1.pushRetentionArgument)(args, options === null || options === void 0 ? void 0 : options.RETENTION);
      (0, _1.pushEncodingArgument)(args, options === null || options === void 0 ? void 0 : options.ENCODING);
      (0, _1.pushChunkSizeArgument)(args, options === null || options === void 0 ? void 0 : options.CHUNK_SIZE);
      if (options === null || options === void 0 ? void 0 : options.DUPLICATE_POLICY) {
        args.push("DUPLICATE_POLICY", options.DUPLICATE_POLICY);
      }
      (0, _1.pushLabelsArgument)(args, options === null || options === void 0 ? void 0 : options.LABELS);
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/CREATERULE.js
var require_CREATERULE = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/CREATERULE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(sourceKey, destinationKey, aggregationType, timeBucket) {
      return [
        "TS.CREATERULE",
        sourceKey,
        destinationKey,
        "AGGREGATION",
        aggregationType,
        timeBucket.toString()
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/DECRBY.js
var require_DECRBY2 = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/DECRBY.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var _1 = require_commands7();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, value, options) {
      return (0, _1.transformIncrDecrArguments)("TS.DECRBY", key2, value, options);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/DEL.js
var require_DEL4 = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/DEL.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRTS_KEY_INDEX = void 0;
    var _1 = require_commands7();
    exports.FIRTS_KEY_INDEX = 1;
    function transformArguments(key2, fromTimestamp, toTimestamp) {
      return [
        "TS.DEL",
        key2,
        (0, _1.transformTimestampArgument)(fromTimestamp),
        (0, _1.transformTimestampArgument)(toTimestamp)
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/DELETERULE.js
var require_DELETERULE = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/DELETERULE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(sourceKey, destinationKey) {
      return [
        "TS.DELETERULE",
        sourceKey,
        destinationKey
      ];
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/GET.js
var require_GET3 = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/GET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var _1 = require_commands7();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2) {
      return ["TS.GET", key2];
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      if (reply.length === 0)
        return null;
      return (0, _1.transformSampleReply)(reply);
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/INCRBY.js
var require_INCRBY4 = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/INCRBY.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var _1 = require_commands7();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(key2, value, options) {
      return (0, _1.transformIncrDecrArguments)("TS.INCRBY", key2, value, options);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/INFO.js
var require_INFO7 = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/INFO.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2) {
      return ["TS.INFO", key2];
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return {
        totalSamples: reply[1],
        memoryUsage: reply[3],
        firstTimestamp: reply[5],
        lastTimestamp: reply[7],
        retentionTime: reply[9],
        chunkCount: reply[11],
        chunkSize: reply[13],
        chunkType: reply[15],
        duplicatePolicy: reply[17],
        labels: reply[19].map(([name, value]) => ({
          name,
          value
        })),
        sourceKey: reply[21],
        rules: reply[23].map(([key2, timeBucket, aggregationType]) => ({
          key: key2,
          timeBucket,
          aggregationType
        }))
      };
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/INFO_DEBUG.js
var require_INFO_DEBUG = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/INFO_DEBUG.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = exports.IS_READ_ONLY = void 0;
    var INFO_1 = require_INFO7();
    var INFO_2 = require_INFO7();
    Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
      return INFO_2.IS_READ_ONLY;
    } });
    Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
      return INFO_2.FIRST_KEY_INDEX;
    } });
    function transformArguments(key2) {
      const args = (0, INFO_1.transformArguments)(key2);
      args.push("DEBUG");
      return args;
    }
    exports.transformArguments = transformArguments;
    function transformReply(rawReply) {
      const reply = (0, INFO_1.transformReply)(rawReply);
      reply.keySelfName = rawReply[25];
      reply.chunks = rawReply[27].map((chunk) => ({
        startTimestamp: chunk[1],
        endTimestamp: chunk[3],
        samples: chunk[5],
        size: chunk[7],
        bytesPerSample: chunk[9]
      }));
      return reply;
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/MADD.js
var require_MADD2 = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/MADD.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
    var _1 = require_commands7();
    exports.FIRST_KEY_INDEX = 1;
    function transformArguments(toAdd) {
      const args = ["TS.MADD"];
      for (const { key: key2, timestamp, value } of toAdd) {
        args.push(key2, (0, _1.transformTimestampArgument)(timestamp), value.toString());
      }
      return args;
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/MGET.js
var require_MGET3 = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/MGET.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
    var _1 = require_commands7();
    exports.IS_READ_ONLY = true;
    function transformArguments(filter) {
      return (0, _1.pushFilterArgument)(["TS.MGET"], filter);
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return reply.map(([key2, _, sample]) => ({
        key: key2,
        sample: (0, _1.transformSampleReply)(sample)
      }));
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/MGET_WITHLABELS.js
var require_MGET_WITHLABELS = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/MGET_WITHLABELS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
    var _1 = require_commands7();
    exports.IS_READ_ONLY = true;
    function transformArguments(filter, options) {
      const args = ["TS.MGET"];
      (0, _1.pushWithLabelsArgument)(args, options === null || options === void 0 ? void 0 : options.SELECTED_LABELS);
      (0, _1.pushFilterArgument)(args, filter);
      return args;
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return reply.map(([key2, labels, sample]) => ({
        key: key2,
        labels: (0, _1.transformLablesReply)(labels),
        sample: (0, _1.transformSampleReply)(sample)
      }));
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/QUERYINDEX.js
var require_QUERYINDEX = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/QUERYINDEX.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformArguments = exports.IS_READ_ONLY = void 0;
    var generic_transformers_1 = require_generic_transformers();
    exports.IS_READ_ONLY = true;
    function transformArguments(filter) {
      return (0, generic_transformers_1.pushVerdictArguments)(["TS.QUERYINDEX"], filter);
    }
    exports.transformArguments = transformArguments;
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/RANGE.js
var require_RANGE = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/RANGE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var _1 = require_commands7();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, fromTimestamp, toTimestamp, options) {
      return (0, _1.pushRangeArguments)(["TS.RANGE", key2], fromTimestamp, toTimestamp, options);
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return (0, _1.transformRangeReply)(reply);
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/REVRANGE.js
var require_REVRANGE = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/REVRANGE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
    var _1 = require_commands7();
    exports.FIRST_KEY_INDEX = 1;
    exports.IS_READ_ONLY = true;
    function transformArguments(key2, fromTimestamp, toTimestamp, options) {
      return (0, _1.pushRangeArguments)(["TS.REVRANGE", key2], fromTimestamp, toTimestamp, options);
    }
    exports.transformArguments = transformArguments;
    function transformReply(reply) {
      return (0, _1.transformRangeReply)(reply);
    }
    exports.transformReply = transformReply;
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/MRANGE.js
var require_MRANGE = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/MRANGE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
    var _1 = require_commands7();
    exports.IS_READ_ONLY = true;
    function transformArguments(fromTimestamp, toTimestamp, filters, options) {
      return (0, _1.pushMRangeArguments)(["TS.MRANGE"], fromTimestamp, toTimestamp, filters, options);
    }
    exports.transformArguments = transformArguments;
    var _2 = require_commands7();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return _2.transformMRangeReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/MRANGE_WITHLABELS.js
var require_MRANGE_WITHLABELS = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/MRANGE_WITHLABELS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
    var _1 = require_commands7();
    exports.IS_READ_ONLY = true;
    function transformArguments(fromTimestamp, toTimestamp, filters, options) {
      return (0, _1.pushMRangeWithLabelsArguments)(["TS.MRANGE"], fromTimestamp, toTimestamp, filters, options);
    }
    exports.transformArguments = transformArguments;
    var _2 = require_commands7();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return _2.transformMRangeWithLabelsReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/MREVRANGE.js
var require_MREVRANGE = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/MREVRANGE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
    var _1 = require_commands7();
    exports.IS_READ_ONLY = true;
    function transformArguments(fromTimestamp, toTimestamp, filters, options) {
      return (0, _1.pushMRangeArguments)(["TS.MREVRANGE"], fromTimestamp, toTimestamp, filters, options);
    }
    exports.transformArguments = transformArguments;
    var _2 = require_commands7();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return _2.transformMRangeReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/MREVRANGE_WITHLABELS.js
var require_MREVRANGE_WITHLABELS = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/MREVRANGE_WITHLABELS.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
    var _1 = require_commands7();
    exports.IS_READ_ONLY = true;
    function transformArguments(fromTimestamp, toTimestamp, filters, options) {
      return (0, _1.pushMRangeWithLabelsArguments)(["TS.MREVRANGE"], fromTimestamp, toTimestamp, filters, options);
    }
    exports.transformArguments = transformArguments;
    var _2 = require_commands7();
    Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
      return _2.transformMRangeWithLabelsReply;
    } });
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/index.js
var require_commands7 = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/commands/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformMRangeWithLabelsReply = exports.transformMRangeReply = exports.transformRangeReply = exports.pushMRangeWithLabelsArguments = exports.pushWithLabelsArgument = exports.pushMRangeArguments = exports.pushFilterArgument = exports.pushMRangeGroupByArguments = exports.pushRangeArguments = exports.transformSampleReply = exports.transformIncrDecrArguments = exports.pushLabelsArgument = exports.transformLablesReply = exports.pushChunkSizeArgument = exports.pushEncodingArgument = exports.TimeSeriesEncoding = exports.pushRetentionArgument = exports.transformTimestampArgument = exports.TimeSeriesReducers = exports.TimeSeriesDuplicatePolicies = exports.TimeSeriesAggregationType = void 0;
    var ADD = require_ADD4();
    var ALTER = require_ALTER2();
    var CREATE = require_CREATE2();
    var CREATERULE = require_CREATERULE();
    var DECRBY = require_DECRBY2();
    var DEL = require_DEL4();
    var DELETERULE = require_DELETERULE();
    var GET = require_GET3();
    var INCRBY = require_INCRBY4();
    var INFO_DEBUG = require_INFO_DEBUG();
    var INFO = require_INFO7();
    var MADD = require_MADD2();
    var MGET = require_MGET3();
    var MGET_WITHLABELS = require_MGET_WITHLABELS();
    var QUERYINDEX = require_QUERYINDEX();
    var RANGE = require_RANGE();
    var REVRANGE = require_REVRANGE();
    var MRANGE = require_MRANGE();
    var MRANGE_WITHLABELS = require_MRANGE_WITHLABELS();
    var MREVRANGE = require_MREVRANGE();
    var MREVRANGE_WITHLABELS = require_MREVRANGE_WITHLABELS();
    var generic_transformers_1 = require_generic_transformers();
    exports.default = {
      ADD,
      add: ADD,
      ALTER,
      alter: ALTER,
      CREATE,
      create: CREATE,
      CREATERULE,
      createRule: CREATERULE,
      DECRBY,
      decrBy: DECRBY,
      DEL,
      del: DEL,
      DELETERULE,
      deleteRule: DELETERULE,
      GET,
      get: GET,
      INCRBY,
      incrBy: INCRBY,
      INFO_DEBUG,
      infoDebug: INFO_DEBUG,
      INFO,
      info: INFO,
      MADD,
      mAdd: MADD,
      MGET,
      mGet: MGET,
      MGET_WITHLABELS,
      mGetWithLabels: MGET_WITHLABELS,
      QUERYINDEX,
      queryIndex: QUERYINDEX,
      RANGE,
      range: RANGE,
      REVRANGE,
      revRange: REVRANGE,
      MRANGE,
      mRange: MRANGE,
      MRANGE_WITHLABELS,
      mRangeWithLabels: MRANGE_WITHLABELS,
      MREVRANGE,
      mRevRange: MREVRANGE,
      MREVRANGE_WITHLABELS,
      mRevRangeWithLabels: MREVRANGE_WITHLABELS
    };
    var TimeSeriesAggregationType;
    (function(TimeSeriesAggregationType2) {
      TimeSeriesAggregationType2["AVERAGE"] = "avg";
      TimeSeriesAggregationType2["SUM"] = "sum";
      TimeSeriesAggregationType2["MINIMUM"] = "min";
      TimeSeriesAggregationType2["MAXIMUM"] = "max";
      TimeSeriesAggregationType2["RANGE"] = "range";
      TimeSeriesAggregationType2["COUNT"] = "count";
      TimeSeriesAggregationType2["FIRST"] = "first";
      TimeSeriesAggregationType2["LAST"] = "last";
      TimeSeriesAggregationType2["STD_P"] = "std.p";
      TimeSeriesAggregationType2["STD_S"] = "std.s";
      TimeSeriesAggregationType2["VAR_P"] = "var.p";
      TimeSeriesAggregationType2["VAR_S"] = "var.s";
    })(TimeSeriesAggregationType = exports.TimeSeriesAggregationType || (exports.TimeSeriesAggregationType = {}));
    var TimeSeriesDuplicatePolicies;
    (function(TimeSeriesDuplicatePolicies2) {
      TimeSeriesDuplicatePolicies2["BLOCK"] = "BLOCK";
      TimeSeriesDuplicatePolicies2["FIRST"] = "FIRST";
      TimeSeriesDuplicatePolicies2["LAST"] = "LAST";
      TimeSeriesDuplicatePolicies2["MIN"] = "MIN";
      TimeSeriesDuplicatePolicies2["MAX"] = "MAX";
      TimeSeriesDuplicatePolicies2["SUM"] = "SUM";
    })(TimeSeriesDuplicatePolicies = exports.TimeSeriesDuplicatePolicies || (exports.TimeSeriesDuplicatePolicies = {}));
    var TimeSeriesReducers;
    (function(TimeSeriesReducers2) {
      TimeSeriesReducers2["SUM"] = "sum";
      TimeSeriesReducers2["MINIMUM"] = "min";
      TimeSeriesReducers2["MAXIMUM"] = "max";
    })(TimeSeriesReducers = exports.TimeSeriesReducers || (exports.TimeSeriesReducers = {}));
    function transformTimestampArgument(timestamp) {
      if (typeof timestamp === "string")
        return timestamp;
      return (typeof timestamp === "number" ? timestamp : timestamp.getTime()).toString();
    }
    exports.transformTimestampArgument = transformTimestampArgument;
    function pushRetentionArgument(args, retention) {
      if (retention) {
        args.push("RETENTION", retention.toString());
      }
      return args;
    }
    exports.pushRetentionArgument = pushRetentionArgument;
    var TimeSeriesEncoding;
    (function(TimeSeriesEncoding2) {
      TimeSeriesEncoding2["COMPRESSED"] = "COMPRESSED";
      TimeSeriesEncoding2["UNCOMPRESSED"] = "UNCOMPRESSED";
    })(TimeSeriesEncoding = exports.TimeSeriesEncoding || (exports.TimeSeriesEncoding = {}));
    function pushEncodingArgument(args, encoding) {
      if (encoding) {
        args.push("ENCODING", encoding);
      }
      return args;
    }
    exports.pushEncodingArgument = pushEncodingArgument;
    function pushChunkSizeArgument(args, chunkSize) {
      if (chunkSize) {
        args.push("CHUNK_SIZE", chunkSize.toString());
      }
      return args;
    }
    exports.pushChunkSizeArgument = pushChunkSizeArgument;
    function transformLablesReply(reply) {
      const labels = {};
      for (const [key2, value] of reply) {
        labels[key2] = value;
      }
      return labels;
    }
    exports.transformLablesReply = transformLablesReply;
    function pushLabelsArgument(args, labels) {
      if (labels) {
        args.push("LABELS");
        for (const [label, value] of Object.entries(labels)) {
          args.push(label, value);
        }
      }
      return args;
    }
    exports.pushLabelsArgument = pushLabelsArgument;
    function transformIncrDecrArguments(command, key2, value, options) {
      const args = [
        command,
        key2,
        value.toString()
      ];
      if ((options === null || options === void 0 ? void 0 : options.TIMESTAMP) !== void 0 && (options === null || options === void 0 ? void 0 : options.TIMESTAMP) !== null) {
        args.push("TIMESTAMP", transformTimestampArgument(options.TIMESTAMP));
      }
      pushRetentionArgument(args, options === null || options === void 0 ? void 0 : options.RETENTION);
      if (options === null || options === void 0 ? void 0 : options.UNCOMPRESSED) {
        args.push("UNCOMPRESSED");
      }
      pushChunkSizeArgument(args, options === null || options === void 0 ? void 0 : options.CHUNK_SIZE);
      pushLabelsArgument(args, options === null || options === void 0 ? void 0 : options.LABELS);
      return args;
    }
    exports.transformIncrDecrArguments = transformIncrDecrArguments;
    function transformSampleReply(reply) {
      return {
        timestamp: reply[0],
        value: Number(reply[1])
      };
    }
    exports.transformSampleReply = transformSampleReply;
    function pushRangeArguments(args, fromTimestamp, toTimestamp, options) {
      args.push(transformTimestampArgument(fromTimestamp), transformTimestampArgument(toTimestamp));
      if (options === null || options === void 0 ? void 0 : options.FILTER_BY_TS) {
        args.push("FILTER_BY_TS");
        for (const ts of options.FILTER_BY_TS) {
          args.push(transformTimestampArgument(ts));
        }
      }
      if (options === null || options === void 0 ? void 0 : options.FILTER_BY_VALUE) {
        args.push("FILTER_BY_VALUE", options.FILTER_BY_VALUE.min.toString(), options.FILTER_BY_VALUE.max.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.COUNT) {
        args.push("COUNT", options.COUNT.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.ALIGN) {
        args.push("ALIGN", transformTimestampArgument(options.ALIGN));
      }
      if (options === null || options === void 0 ? void 0 : options.AGGREGATION) {
        args.push("AGGREGATION", options.AGGREGATION.type, transformTimestampArgument(options.AGGREGATION.timeBucket));
      }
      return args;
    }
    exports.pushRangeArguments = pushRangeArguments;
    function pushMRangeGroupByArguments(args, groupBy) {
      if (groupBy) {
        args.push("GROUPBY", groupBy.label, "REDUCE", groupBy.reducer);
      }
      return args;
    }
    exports.pushMRangeGroupByArguments = pushMRangeGroupByArguments;
    function pushFilterArgument(args, filter) {
      args.push("FILTER");
      (0, generic_transformers_1.pushVerdictArguments)(args, filter);
      return args;
    }
    exports.pushFilterArgument = pushFilterArgument;
    function pushMRangeArguments(args, fromTimestamp, toTimestamp, filter, options) {
      pushRangeArguments(args, fromTimestamp, toTimestamp, options);
      pushFilterArgument(args, filter);
      pushMRangeGroupByArguments(args, options === null || options === void 0 ? void 0 : options.GROUPBY);
      return args;
    }
    exports.pushMRangeArguments = pushMRangeArguments;
    function pushWithLabelsArgument(args, selectedLabels) {
      if (!selectedLabels) {
        args.push("WITHLABELS");
      } else {
        args.push("SELECTED_LABELS");
        (0, generic_transformers_1.pushVerdictArguments)(args, selectedLabels);
      }
      return args;
    }
    exports.pushWithLabelsArgument = pushWithLabelsArgument;
    function pushMRangeWithLabelsArguments(args, fromTimestamp, toTimestamp, filter, options) {
      pushRangeArguments(args, fromTimestamp, toTimestamp, options);
      pushWithLabelsArgument(args, options === null || options === void 0 ? void 0 : options.SELECTED_LABELS);
      pushFilterArgument(args, filter);
      pushMRangeGroupByArguments(args, options === null || options === void 0 ? void 0 : options.GROUPBY);
      return args;
    }
    exports.pushMRangeWithLabelsArguments = pushMRangeWithLabelsArguments;
    function transformRangeReply(reply) {
      return reply.map(transformSampleReply);
    }
    exports.transformRangeReply = transformRangeReply;
    function transformMRangeReply(reply) {
      const args = [];
      for (const [key2, _, sample] of reply) {
        args.push({
          key: key2,
          samples: sample.map(transformSampleReply)
        });
      }
      return args;
    }
    exports.transformMRangeReply = transformMRangeReply;
    function transformMRangeWithLabelsReply(reply) {
      const args = [];
      for (const [key2, labels, samples] of reply) {
        args.push({
          key: key2,
          labels: transformLablesReply(labels),
          samples: samples.map(transformSampleReply)
        });
      }
      return args;
    }
    exports.transformMRangeWithLabelsReply = transformMRangeWithLabelsReply;
  }
});

// node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/index.js
var require_dist6 = __commonJS({
  "node_modules/.pnpm/@node-redis+time-series@1.0.2_@node-redis+client@1.0.4/node_modules/@node-redis/time-series/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TimeSeriesAggregationType = exports.TimeSeriesEncoding = exports.TimeSeriesDuplicatePolicies = exports.default = void 0;
    var commands_1 = require_commands7();
    Object.defineProperty(exports, "default", { enumerable: true, get: function() {
      return commands_1.default;
    } });
    var commands_2 = require_commands7();
    Object.defineProperty(exports, "TimeSeriesDuplicatePolicies", { enumerable: true, get: function() {
      return commands_2.TimeSeriesDuplicatePolicies;
    } });
    Object.defineProperty(exports, "TimeSeriesEncoding", { enumerable: true, get: function() {
      return commands_2.TimeSeriesEncoding;
    } });
    Object.defineProperty(exports, "TimeSeriesAggregationType", { enumerable: true, get: function() {
      return commands_2.TimeSeriesAggregationType;
    } });
  }
});

// node_modules/.pnpm/redis@4.0.4/node_modules/redis/dist/index.js
var require_dist7 = __commonJS({
  "node_modules/.pnpm/redis@4.0.4/node_modules/redis/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m2, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m2[k];
      } });
    } : function(o, m2, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m2[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m2, exports2) {
      for (var p in m2)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m2, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createCluster = exports.createClient = void 0;
    var client_1 = require_dist();
    var bloom_1 = require_dist2();
    var graph_1 = require_dist3();
    var json_1 = require_dist4();
    var search_1 = require_dist5();
    var time_series_1 = require_dist6();
    __exportStar(require_dist(), exports);
    __exportStar(require_dist2(), exports);
    __exportStar(require_dist3(), exports);
    __exportStar(require_dist4(), exports);
    __exportStar(require_dist5(), exports);
    __exportStar(require_dist6(), exports);
    var modules = __spreadProps(__spreadValues({}, bloom_1.default), {
      graph: graph_1.default,
      json: json_1.default,
      ft: search_1.default,
      ts: time_series_1.default
    });
    function createClient(options) {
      return (0, client_1.createClient)(__spreadProps(__spreadValues({}, options), {
        modules: __spreadValues(__spreadValues({}, modules), options === null || options === void 0 ? void 0 : options.modules)
      }));
    }
    exports.createClient = createClient;
    function createCluster(options) {
      return (0, client_1.createCluster)(__spreadProps(__spreadValues({}, options), {
        modules: __spreadValues(__spreadValues({}, modules), options === null || options === void 0 ? void 0 : options.modules)
      }));
    }
    exports.createCluster = createCluster;
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/errors.js
var require_errors3 = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RedisError = class extends Error {
      constructor(message) {
        super(message);
        this.name = "RedisError";
      }
    };
    exports.default = RedisError;
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/redis/redis-shim.js
var require_redis_shim = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/redis/redis-shim.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var redis_1 = require_dist7();
    var errors_1 = __importDefault(require_errors3());
    var RedisShim = class {
      constructor(urlOrConnection) {
        if (typeof urlOrConnection === "string") {
          this.redis = (0, redis_1.createClient)({ url: urlOrConnection });
        } else {
          this.redis = urlOrConnection;
        }
      }
      async open() {
        await this.redis.connect();
      }
      async close() {
        await this.redis.quit();
      }
      execute(command) {
        return this.redis.sendCommand(command);
      }
      async unlink(key2) {
        await this.redis.unlink(key2);
      }
      async expire(key2, ttl) {
        await this.redis.expire(key2, ttl);
      }
      get(key2) {
        return this.redis.get(key2);
      }
      set(key2, value) {
        return this.redis.set(key2, value);
      }
      hgetall(key2) {
        return this.redis.hGetAll(key2);
      }
      async hsetall(key2, data) {
        try {
          await this.redis.executeIsolated(async (isolatedClient) => {
            await isolatedClient.watch(key2);
            await isolatedClient.multi().unlink(key2).hSet(key2, data).exec();
          });
        } catch (error2) {
          if (error2.name === "WatchError")
            throw new errors_1.default("Watch error when setting HASH.");
          throw error2;
        }
      }
    };
    exports.default = RedisShim;
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where.js
var require_where = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Where = void 0;
    var Where = class {
    };
    exports.Where = Where;
    exports.default = Where;
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where-and.js
var require_where_and = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where-and.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var where_1 = __importDefault(require_where());
    var WhereAnd = class extends where_1.default {
      constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
      }
      toString() {
        return `( ${this.left.toString()} ${this.right.toString()} )`;
      }
    };
    exports.default = WhereAnd;
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where-or.js
var require_where_or = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where-or.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var where_1 = __importDefault(require_where());
    var WhereOr = class extends where_1.default {
      constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
      }
      toString() {
        return `( ${this.left.toString()} | ${this.right.toString()} )`;
      }
    };
    exports.default = WhereOr;
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where-field.js
var require_where_field = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where-field.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WhereField = class {
      constructor(search, field) {
        this.negated = false;
        this.search = search;
        this.field = field;
      }
      get is() {
        return this;
      }
      get does() {
        return this;
      }
      get not() {
        this.negate();
        return this;
      }
      negate() {
        this.negated = !this.negated;
      }
      buildQuery(valuePortion) {
        let negationPortion = this.negated ? "-" : "";
        let fieldPortion = this.field;
        return `(${negationPortion}@${fieldPortion}:${valuePortion})`;
      }
    };
    exports.default = WhereField;
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where-string-array.js
var require_where_string_array = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where-string-array.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var where_field_1 = __importDefault(require_where_field());
    var WhereStringArray = class extends where_field_1.default {
      contain(value) {
        this.value = [value];
        return this.search;
      }
      contains(value) {
        return this.contain(value);
      }
      containsOneOf(...value) {
        this.value = value;
        return this.search;
      }
      containOneOf(...value) {
        return this.containsOneOf(...value);
      }
      toString() {
        let matchPunctuation = /[,.<>{}[\]"':;!@#$%^&*()\-+=~| ]/g;
        let escapedValue = this.value.map((s3) => s3.replace(matchPunctuation, "\\$&")).join("|");
        return this.buildQuery(`{${escapedValue}}`);
      }
    };
    exports.default = WhereStringArray;
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where-boolean.js
var require_where_boolean = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where-boolean.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WhereJsonBoolean = exports.WhereHashBoolean = exports.WhereBoolean = void 0;
    var where_field_1 = __importDefault(require_where_field());
    var WhereBoolean = class extends where_field_1.default {
      eq(value) {
        this.value = value;
        return this.search;
      }
      equal(value) {
        return this.eq(value);
      }
      equals(value) {
        return this.eq(value);
      }
      equalTo(value) {
        return this.eq(value);
      }
      true() {
        return this.eq(true);
      }
      false() {
        return this.eq(false);
      }
    };
    exports.WhereBoolean = WhereBoolean;
    var WhereHashBoolean = class extends WhereBoolean {
      toString() {
        return this.buildQuery(`{${this.value ? "1" : "0"}}`);
      }
    };
    exports.WhereHashBoolean = WhereHashBoolean;
    var WhereJsonBoolean = class extends WhereBoolean {
      toString() {
        return this.buildQuery(`{${this.value}}`);
      }
    };
    exports.WhereJsonBoolean = WhereJsonBoolean;
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where-number.js
var require_where_number = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where-number.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var where_field_1 = __importDefault(require_where_field());
    var WhereNumber = class extends where_field_1.default {
      constructor() {
        super(...arguments);
        this.lower = Number.NEGATIVE_INFINITY;
        this.upper = Number.POSITIVE_INFINITY;
        this.lowerExclusive = false;
        this.upperExclusive = false;
      }
      eq(value) {
        this.lower = value;
        this.upper = value;
        return this.search;
      }
      gt(value) {
        this.lower = value;
        this.lowerExclusive = true;
        return this.search;
      }
      gte(value) {
        this.lower = value;
        return this.search;
      }
      lt(value) {
        this.upper = value;
        this.upperExclusive = true;
        return this.search;
      }
      lte(value) {
        this.upper = value;
        return this.search;
      }
      between(lower2, upper) {
        this.lower = lower2;
        this.upper = upper;
        return this.search;
      }
      equal(value) {
        return this.eq(value);
      }
      equals(value) {
        return this.eq(value);
      }
      equalTo(value) {
        return this.eq(value);
      }
      greaterThan(value) {
        return this.gt(value);
      }
      greaterThanOrEqualTo(value) {
        return this.gte(value);
      }
      lessThan(value) {
        return this.lt(value);
      }
      lessThanOrEqualTo(value) {
        return this.lte(value);
      }
      toString() {
        let lower2 = this.makeLowerString();
        let upper = this.makeUpperString();
        return this.buildQuery(`[${lower2} ${upper}]`);
      }
      makeLowerString() {
        if (this.lower === Number.NEGATIVE_INFINITY)
          return "-inf";
        if (this.lowerExclusive)
          return `(${this.lower}`;
        return this.lower.toString();
      }
      makeUpperString() {
        if (this.upper === Number.POSITIVE_INFINITY)
          return "+inf";
        if (this.upperExclusive)
          return `(${this.upper}`;
        return this.upper.toString();
      }
    };
    exports.default = WhereNumber;
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where-point.js
var require_where_point = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where-point.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Circle = void 0;
    var where_field_1 = __importDefault(require_where_field());
    var Circle = class {
      constructor() {
        this.longitudeOfOrigin = 0;
        this.latitudeOfOrigin = 0;
        this.size = 1;
        this.units = "m";
      }
      longitude(value) {
        this.longitudeOfOrigin = value;
        return this;
      }
      latitude(value) {
        this.latitudeOfOrigin = value;
        return this;
      }
      origin(pointOrLongitude, latitude) {
        if (typeof pointOrLongitude === "number" && latitude !== void 0) {
          this.longitudeOfOrigin = pointOrLongitude;
          this.latitudeOfOrigin = latitude;
        } else {
          let point = pointOrLongitude;
          this.longitudeOfOrigin = point.longitude;
          this.latitudeOfOrigin = point.latitude;
        }
        return this;
      }
      radius(size) {
        this.size = size;
        return this;
      }
      get m() {
        return this.meters;
      }
      get meter() {
        return this.meters;
      }
      get meters() {
        this.units = "m";
        return this;
      }
      get km() {
        return this.kilometers;
      }
      get kilometer() {
        return this.kilometers;
      }
      get kilometers() {
        this.units = "km";
        return this;
      }
      get ft() {
        return this.feet;
      }
      get foot() {
        return this.feet;
      }
      get feet() {
        this.units = "ft";
        return this;
      }
      get mi() {
        return this.miles;
      }
      get mile() {
        return this.miles;
      }
      get miles() {
        this.units = "mi";
        return this;
      }
    };
    exports.Circle = Circle;
    var WherePoint = class extends where_field_1.default {
      constructor() {
        super(...arguments);
        this.circle = new Circle();
      }
      inRadius(circleFn) {
        return this.inCircle(circleFn);
      }
      inCircle(circleFn) {
        this.circle = circleFn(this.circle);
        return this.search;
      }
      toString() {
        let { longitudeOfOrigin, latitudeOfOrigin, size, units } = this.circle;
        return this.buildQuery(`[${longitudeOfOrigin} ${latitudeOfOrigin} ${size} ${units}]`);
      }
    };
    exports.default = WherePoint;
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where-string.js
var require_where_string = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where-string.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var where_field_1 = __importDefault(require_where_field());
    var errors_1 = __importDefault(require_errors3());
    var WhereString = class extends where_field_1.default {
      eq(value) {
        this.value = value.toString();
        return this.search;
      }
      equal(value) {
        return this.eq(value);
      }
      equals(value) {
        return this.eq(value);
      }
      equalTo(value) {
        return this.eq(value);
      }
      match(_) {
        return this.throwMatchExcpetion();
      }
      matches(_) {
        return this.throwMatchExcpetion();
      }
      matchExact(_) {
        return this.throwMatchExcpetion();
      }
      matchExactly(_) {
        return this.throwMatchExcpetion();
      }
      matchesExactly(_) {
        return this.throwMatchExcpetion();
      }
      get exact() {
        return this.throwMatchExcpetionReturningThis();
      }
      get exactly() {
        return this.throwMatchExcpetionReturningThis();
      }
      toString() {
        let matchPunctuation = /[,.<>{}[\]"':;!@#$%^&*()\-+=~|/\\ ]/g;
        let escapedValue = this.value.replace(matchPunctuation, "\\$&");
        return this.buildQuery(`{${escapedValue}}`);
      }
      throwMatchExcpetion() {
        throw new errors_1.default("Cannot perform full-text search operations like .match on field of type 'string'. If full-text search is needed on this field, change the type to 'text' in the Schema.");
      }
      throwMatchExcpetionReturningThis() {
        throw new errors_1.default("Cannot perform full-text search operations like .match on field of type 'string'. If full-text search is needed on this field, change the type to 'text' in the Schema.");
      }
    };
    exports.default = WhereString;
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where-text.js
var require_where_text = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where-text.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var where_field_1 = __importDefault(require_where_field());
    var errors_1 = __importDefault(require_errors3());
    var WhereText = class extends where_field_1.default {
      constructor() {
        super(...arguments);
        this.exactValue = false;
      }
      match(value) {
        this.value = value.toString();
        return this.search;
      }
      matchExact(value) {
        this.exact.value = value.toString();
        return this.search;
      }
      matches(value) {
        return this.match(value);
      }
      matchExactly(value) {
        return this.matchExact(value);
      }
      matchesExactly(value) {
        return this.matchExact(value);
      }
      get exact() {
        this.exactValue = true;
        return this;
      }
      get exactly() {
        return this.exact;
      }
      eq(_) {
        return this.throwEqualsExcpetion();
      }
      equal(_) {
        return this.throwEqualsExcpetion();
      }
      equals(_) {
        return this.throwEqualsExcpetion();
      }
      equalTo(_) {
        return this.throwEqualsExcpetion();
      }
      toString() {
        let matchPunctuation = /[,.<>{}[\]"':;!@#$%^&()\-+=~|]/g;
        let escapedValue = this.value.replace(matchPunctuation, "\\$&");
        if (this.exactValue) {
          return this.buildQuery(`"${escapedValue}"`);
        } else {
          return this.buildQuery(`'${escapedValue}'`);
        }
      }
      throwEqualsExcpetion() {
        throw new errors_1.default("Cannot call .equals on a field of type 'text', either use .match to perform full-text search or change the type to 'string' in the Schema.");
      }
    };
    exports.default = WhereText;
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/repository/converter.js
var require_converter = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/repository/converter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JsonConverter = exports.HashConverter = void 0;
    var AbstractConverter = class {
      constructor(schemaDef) {
        this.schemaDef = schemaDef;
      }
    };
    var HashConverter = class extends AbstractConverter {
      toHashData(entityData) {
        let hashData = {};
        for (let fieldName in this.schemaDef) {
          let entityValue = entityData[fieldName];
          let fieldDef = this.schemaDef[fieldName];
          let fieldType = fieldDef.type;
          if (entityValue !== void 0)
            hashData[fieldName] = toHashConverters[fieldType](entityValue, fieldDef);
        }
        return hashData;
      }
      toEntityData(hashData) {
        let entityData = {};
        for (let fieldName in this.schemaDef) {
          let hashValue = hashData[fieldName];
          let fieldDef = this.schemaDef[fieldName];
          let fieldType = fieldDef.type;
          if (hashValue !== void 0)
            entityData[fieldName] = fromHashConverters[fieldType](hashValue, fieldDef);
        }
        return entityData;
      }
    };
    exports.HashConverter = HashConverter;
    var JsonConverter = class extends AbstractConverter {
      toJsonData(entityData) {
        let jsonData = {};
        for (let fieldName in this.schemaDef) {
          let fieldValue = entityData[fieldName];
          let fieldDef = this.schemaDef[fieldName];
          let fieldType = fieldDef.type;
          if (fieldValue !== void 0)
            jsonData[fieldName] = toJsonConverters[fieldType](fieldValue);
        }
        return jsonData;
      }
      toEntityData(jsonData) {
        let entityData = {};
        if (jsonData === null)
          return entityData;
        for (let fieldName in this.schemaDef) {
          let jsonValue = jsonData[fieldName];
          let fieldDef = this.schemaDef[fieldName];
          let fieldType = fieldDef.type;
          if (jsonValue !== void 0 && jsonValue !== null)
            entityData[fieldName] = fromJsonConverters[fieldType](jsonValue);
        }
        return entityData;
      }
    };
    exports.JsonConverter = JsonConverter;
    var toHashConverters = {
      "number": (value) => value.toString(),
      "boolean": (value) => value ? "1" : "0",
      "string": (value) => value.toString(),
      "text": (value) => value.toString(),
      "point": (value) => pointToString(value),
      "date": (value) => dateToString(value),
      "string[]": (value, fieldDef) => stringArrayToString(value, fieldDef)
    };
    var fromHashConverters = {
      "number": stringToNumber,
      "boolean": stringToBoolean,
      "string": (value) => value,
      "text": (value) => value,
      "point": stringToPoint,
      "date": stringToDate,
      "string[]": (value, fieldDef) => stringToStringArray(value, fieldDef)
    };
    var toJsonConverters = {
      "number": (value) => value,
      "boolean": (value) => value,
      "string": (value) => value,
      "text": (value) => value,
      "point": (value) => pointToString(value),
      "date": (value) => dateToNumber(value),
      "string[]": (value) => value
    };
    var fromJsonConverters = {
      "number": (value) => value,
      "boolean": (value) => value,
      "string": (value) => value,
      "text": (value) => value,
      "point": (value) => stringToPoint(value),
      "date": (value) => numberToDate(value),
      "string[]": (value) => value
    };
    function pointToString(value) {
      let { longitude, latitude } = value;
      return `${longitude},${latitude}`;
    }
    function dateToString(value) {
      return value.getTime().toString();
    }
    function dateToNumber(value) {
      return value.getTime();
    }
    function stringArrayToString(value, fieldDef) {
      var _a4;
      return value.join((_a4 = fieldDef.separator) !== null && _a4 !== void 0 ? _a4 : "|");
    }
    function stringToNumber(value) {
      let number = Number.parseFloat(value);
      if (Number.isNaN(number) === false)
        return number;
      throw Error(`Non-numeric value of '${value}' read from Redis for number field.`);
    }
    function stringToBoolean(value) {
      if (value === "0")
        return false;
      if (value === "1")
        return true;
      throw Error(`Non-boolean value of '${value}' read from Redis for boolean field.`);
    }
    function stringToPoint(value) {
      let [longitude, latitude] = value.split(",").map(Number.parseFloat);
      return { longitude, latitude };
    }
    function stringToDate(value) {
      let parsed = Number.parseInt(value);
      if (Number.isNaN(parsed))
        throw Error(`Non-numeric value of '${value}' read from Redis for date field.`);
      let date = new Date();
      date.setTime(parsed);
      return date;
    }
    function stringToStringArray(value, fieldDef) {
      var _a4;
      return value.split((_a4 = fieldDef.separator) !== null && _a4 !== void 0 ? _a4 : "|");
    }
    function numberToDate(value) {
      let date = new Date();
      date.setTime(value);
      return date;
    }
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/results-converter.js
var require_results_converter = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/results-converter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JsonSearchResultsConverter = exports.HashSearchResultsConverter = exports.SearchResultsConverter = void 0;
    var converter_1 = require_converter();
    var SearchResultsConverter = class {
      constructor(schema, results) {
        this.schema = schema;
        this.results = results;
      }
      get count() {
        let [count] = this.results;
        return Number.parseInt(count);
      }
      get ids() {
        return this.keys.map((key2) => key2.replace(/^.*:/, ""));
      }
      get keys() {
        let [_count, ...keysAndValues] = this.results;
        return keysAndValues.filter((_entry, index) => index % 2 === 0);
      }
      get values() {
        let [_count, ...keysAndValues] = this.results;
        return keysAndValues.filter((_entry, index) => index % 2 !== 0);
      }
      get entities() {
        let ids = this.ids;
        let values = this.values;
        return values.map((array, index) => this.arrayToEntity(ids[index], array));
      }
    };
    exports.SearchResultsConverter = SearchResultsConverter;
    var HashSearchResultsConverter = class extends SearchResultsConverter {
      arrayToEntity(id, array) {
        let keys = array.filter((_entry, index) => index % 2 === 0);
        let values = array.filter((_entry, index) => index % 2 !== 0);
        let hashData = keys.reduce((object, key2, index) => {
          object[key2] = values[index];
          return object;
        }, {});
        let converter = new converter_1.HashConverter(this.schema.definition);
        let entityData = converter.toEntityData(hashData);
        return new this.schema.entityCtor(this.schema, id, entityData);
      }
    };
    exports.HashSearchResultsConverter = HashSearchResultsConverter;
    var JsonSearchResultsConverter = class extends SearchResultsConverter {
      arrayToEntity(id, array) {
        let jsonString = array[1];
        let jsonData = JSON.parse(jsonString);
        let converter = new converter_1.JsonConverter(this.schema.definition);
        let entityData = converter.toEntityData(jsonData);
        return new this.schema.entityCtor(this.schema, id, entityData);
      }
    };
    exports.JsonSearchResultsConverter = JsonSearchResultsConverter;
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where-date.js
var require_where_date = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/where-date.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var where_field_1 = __importDefault(require_where_field());
    var WhereDate = class extends where_field_1.default {
      constructor() {
        super(...arguments);
        this.lower = Number.NEGATIVE_INFINITY;
        this.upper = Number.POSITIVE_INFINITY;
        this.lowerExclusive = false;
        this.upperExclusive = false;
      }
      eq(value) {
        let epoch = this.coerceDateToEpoch(value);
        this.lower = epoch;
        this.upper = epoch;
        return this.search;
      }
      gt(value) {
        let epoch = this.coerceDateToEpoch(value);
        this.lower = epoch;
        this.lowerExclusive = true;
        return this.search;
      }
      gte(value) {
        this.lower = this.coerceDateToEpoch(value);
        return this.search;
      }
      lt(value) {
        this.upper = this.coerceDateToEpoch(value);
        this.upperExclusive = true;
        return this.search;
      }
      lte(value) {
        this.upper = this.coerceDateToEpoch(value);
        return this.search;
      }
      between(lower2, upper) {
        this.lower = this.coerceDateToEpoch(lower2);
        this.upper = this.coerceDateToEpoch(upper);
        return this.search;
      }
      equal(value) {
        return this.eq(value);
      }
      equals(value) {
        return this.eq(value);
      }
      equalTo(value) {
        return this.eq(value);
      }
      greaterThan(value) {
        return this.gt(value);
      }
      greaterThanOrEqualTo(value) {
        return this.gte(value);
      }
      lessThan(value) {
        return this.lt(value);
      }
      lessThanOrEqualTo(value) {
        return this.lte(value);
      }
      on(value) {
        return this.eq(value);
      }
      after(value) {
        return this.gt(value);
      }
      before(value) {
        return this.lt(value);
      }
      onOrAfter(value) {
        return this.gte(value);
      }
      onOrBefore(value) {
        return this.lte(value);
      }
      toString() {
        let lower2 = this.makeLowerString();
        let upper = this.makeUpperString();
        return this.buildQuery(`[${lower2} ${upper}]`);
      }
      makeLowerString() {
        if (this.lower === Number.NEGATIVE_INFINITY)
          return "-inf";
        if (this.lowerExclusive)
          return `(${this.lower}`;
        return this.lower.toString();
      }
      makeUpperString() {
        if (this.upper === Number.POSITIVE_INFINITY)
          return "+inf";
        if (this.upperExclusive)
          return `(${this.upper}`;
        return this.upper.toString();
      }
      coerceDateToEpoch(value) {
        if (value instanceof Date)
          return value.getTime();
        if (typeof value === "string")
          return new Date(value).getTime();
        return value;
      }
    };
    exports.default = WhereDate;
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/search.js
var require_search = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/search/search.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Search = exports.RawSearch = exports.AbstractSearch = void 0;
    var where_and_1 = __importDefault(require_where_and());
    var where_or_1 = __importDefault(require_where_or());
    var where_string_array_1 = __importDefault(require_where_string_array());
    var where_boolean_1 = require_where_boolean();
    var where_number_1 = __importDefault(require_where_number());
    var where_point_1 = __importDefault(require_where_point());
    var where_string_1 = __importDefault(require_where_string());
    var where_text_1 = __importDefault(require_where_text());
    var results_converter_1 = require_results_converter();
    var __1 = require_dist8();
    var where_date_1 = __importDefault(require_where_date());
    var AbstractSearch = class {
      constructor(schema, client2) {
        this.schema = schema;
        this.client = client2;
      }
      async count() {
        let searchResults = await this.callSearch();
        return this.schema.dataStructure === "JSON" ? new results_converter_1.JsonSearchResultsConverter(this.schema, searchResults).count : new results_converter_1.HashSearchResultsConverter(this.schema, searchResults).count;
      }
      async page(offset, count) {
        let searchResults = await this.callSearch(offset, count);
        return this.schema.dataStructure === "JSON" ? new results_converter_1.JsonSearchResultsConverter(this.schema, searchResults).entities : new results_converter_1.HashSearchResultsConverter(this.schema, searchResults).entities;
      }
      async first() {
        var _a4;
        let foundEntity = await this.page(0, 1);
        return (_a4 = foundEntity[0]) !== null && _a4 !== void 0 ? _a4 : null;
      }
      async all(options = { pageSize: 10 }) {
        let entities = [];
        let offset = 0;
        let pageSize = options.pageSize;
        while (true) {
          let foundEntities = await this.page(offset, pageSize);
          entities.push(...foundEntities);
          if (foundEntities.length < pageSize)
            break;
          offset += pageSize;
        }
        return entities;
      }
      get return() {
        return this;
      }
      async returnCount() {
        return await this.count();
      }
      async returnPage(offset, count) {
        return await this.page(offset, count);
      }
      async returnAll(options = { pageSize: 10 }) {
        return await this.all(options);
      }
      async returnFirst() {
        return await this.first();
      }
      async callSearch(offset = 0, count = 0) {
        let options = {
          indexName: this.schema.indexName,
          query: this.query,
          offset,
          count
        };
        let searchResults;
        try {
          searchResults = await this.client.search(options);
        } catch (error2) {
          let message = error2.message;
          if (message.startsWith("Syntax error")) {
            throw new __1.RedisError(`The query to RediSearch had a syntax error: "${message}".
This is often the result of using a stop word in the query. Either change the query to not use a stop word or change the stop words in the schema definition. You can check the RediSearch source for the default stop words at: https://github.com/RediSearch/RediSearch/blob/master/src/stopwords.h.`);
          }
          throw error2;
        }
        return searchResults;
      }
    };
    exports.AbstractSearch = AbstractSearch;
    var RawSearch = class extends AbstractSearch {
      constructor(schema, client2, query = "*") {
        super(schema, client2);
        this.rawQuery = query;
      }
      get query() {
        return this.rawQuery;
      }
    };
    exports.RawSearch = RawSearch;
    var Search = class extends AbstractSearch {
      get query() {
        if (this.rootWhere === void 0)
          return "*";
        return `${this.rootWhere.toString()}`;
      }
      where(fieldOrFn) {
        return this.anyWhere(where_and_1.default, fieldOrFn);
      }
      and(fieldOrFn) {
        return this.anyWhere(where_and_1.default, fieldOrFn);
      }
      or(fieldOrFn) {
        return this.anyWhere(where_or_1.default, fieldOrFn);
      }
      anyWhere(ctor, fieldOrFn) {
        if (typeof fieldOrFn === "string") {
          return this.anyWhereForField(ctor, fieldOrFn);
        } else {
          return this.anyWhereForFunction(ctor, fieldOrFn);
        }
      }
      anyWhereForField(ctor, field) {
        let where = this.createWhere(field);
        if (this.rootWhere === void 0) {
          this.rootWhere = where;
        } else {
          this.rootWhere = new ctor(this.rootWhere, where);
        }
        return where;
      }
      anyWhereForFunction(ctor, subSearchFn) {
        let search = new Search(this.schema, this.client);
        let subSearch = subSearchFn(search);
        if (subSearch.rootWhere === void 0) {
          throw new Error("Sub-search without and root where was somehow defined.");
        } else {
          if (this.rootWhere === void 0) {
            this.rootWhere = subSearch.rootWhere;
          } else {
            this.rootWhere = new ctor(this.rootWhere, subSearch.rootWhere);
          }
        }
        return this;
      }
      createWhere(field) {
        let fieldDef = this.schema.definition[field];
        if (fieldDef === void 0)
          throw new Error(`The field '${field}' is not part of the schema.`);
        if (fieldDef.type === "boolean" && this.schema.dataStructure === "HASH")
          return new where_boolean_1.WhereHashBoolean(this, field);
        if (fieldDef.type === "boolean" && this.schema.dataStructure === "JSON")
          return new where_boolean_1.WhereJsonBoolean(this, field);
        if (fieldDef.type === "date")
          return new where_date_1.default(this, field);
        if (fieldDef.type === "number")
          return new where_number_1.default(this, field);
        if (fieldDef.type === "point")
          return new where_point_1.default(this, field);
        if (fieldDef.type === "text")
          return new where_text_1.default(this, field);
        if (fieldDef.type === "string")
          return new where_string_1.default(this, field);
        if (fieldDef.type === "string[]")
          return new where_string_array_1.default(this, field);
        throw new Error(`The field type of '${fieldDef.type}' is not a valid field type. Valid types include 'boolean', 'date', 'number', 'point', 'string', and 'string[]'.`);
      }
    };
    exports.Search = Search;
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/repository/repository.js
var require_repository = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/repository/repository.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JsonRepository = exports.HashRepository = void 0;
    var search_1 = require_search();
    var converter_1 = require_converter();
    var Repository = class {
      constructor(schema, client2) {
        this.schema = schema;
        this.client = client2;
      }
      async createIndex() {
        let currentIndexHash = await this.client.get(this.schema.indexHashName);
        if (currentIndexHash !== this.schema.indexHash) {
          await this.dropIndex();
          let options = {
            indexName: this.schema.indexName,
            dataStructure: this.schema.dataStructure,
            prefix: `${this.schema.prefix}:`,
            schema: this.schema.redisSchema
          };
          if (this.schema.useStopWords === "OFF")
            options.stopWords = [];
          if (this.schema.useStopWords === "CUSTOM")
            options.stopWords = this.schema.stopWords;
          await this.client.createIndex(options);
          await this.client.set(this.schema.indexHashName, this.schema.indexHash);
        }
      }
      async dropIndex() {
        try {
          await this.client.unlink(this.schema.indexHashName);
          await this.client.dropIndex(this.schema.indexName);
        } catch (e2) {
          if (e2 instanceof Error && e2.message === "Unknown Index name") {
          } else {
            throw e2;
          }
        }
      }
      createEntity(data = {}) {
        let id = this.schema.generateId();
        let entity = new this.schema.entityCtor(this.schema, id);
        for (let key2 in data) {
          if (this.schema.entityCtor.prototype.hasOwnProperty(key2)) {
            entity[key2] = data[key2];
          }
        }
        return entity;
      }
      async save(entity) {
        let key2 = this.makeKey(entity.entityId);
        if (Object.keys(entity.entityData).length === 0) {
          await this.client.unlink(key2);
        } else {
          await this.writeEntity(key2, entity.entityData);
        }
        return entity.entityId;
      }
      async createAndSave(data = {}) {
        let entity = this.createEntity(data);
        await this.save(entity);
        return entity;
      }
      async fetch(id) {
        let key2 = this.makeKey(id);
        let entityData = await this.readEntity(key2);
        return new this.schema.entityCtor(this.schema, id, entityData);
      }
      async remove(id) {
        let key2 = this.makeKey(id);
        await this.client.unlink(key2);
      }
      async expire(id, ttlInSeconds) {
        let key2 = this.makeKey(id);
        await this.client.expire(key2, ttlInSeconds);
      }
      search() {
        return new search_1.Search(this.schema, this.client);
      }
      searchRaw(query) {
        return new search_1.RawSearch(this.schema, this.client, query);
      }
      makeKey(id) {
        return `${this.schema.prefix}:${id}`;
      }
    };
    exports.default = Repository;
    var HashRepository = class extends Repository {
      constructor(schema, client2) {
        super(schema, client2);
        this.converter = new converter_1.HashConverter(schema.definition);
      }
      async writeEntity(key2, data) {
        let hashData = this.converter.toHashData(data);
        await this.client.hsetall(key2, hashData);
      }
      async readEntity(key2) {
        let hashData = await this.client.hgetall(key2);
        return this.converter.toEntityData(hashData);
      }
    };
    exports.HashRepository = HashRepository;
    var JsonRepository = class extends Repository {
      constructor(schema, client2) {
        super(schema, client2);
        this.converter = new converter_1.JsonConverter(schema.definition);
      }
      async writeEntity(key2, data) {
        let jsonData = this.converter.toJsonData(data);
        await this.client.jsonset(key2, jsonData);
      }
      async readEntity(key2) {
        let jsonData = await this.client.jsonget(key2);
        return this.converter.toEntityData(jsonData);
      }
    };
    exports.JsonRepository = JsonRepository;
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/client.js
var require_client2 = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/client.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var redis_shim_1 = __importDefault(require_redis_shim());
    var repository_1 = require_repository();
    var errors_1 = __importDefault(require_errors3());
    var Client2 = class {
      async use(connection) {
        await this.close();
        this.shim = new redis_shim_1.default(connection);
        return this;
      }
      async open(url = "redis://localhost:6379") {
        if (!this.isOpen()) {
          this.shim = new redis_shim_1.default(url);
          await this.shim.open();
        }
        return this;
      }
      async execute(command) {
        this.validateShimOpen();
        return await this.shim.execute(command.map((arg) => {
          if (arg === false)
            return "0";
          if (arg === true)
            return "1";
          return arg.toString();
        }));
      }
      fetchRepository(schema) {
        this.validateShimOpen();
        if (schema.dataStructure === "JSON") {
          return new repository_1.JsonRepository(schema, this);
        } else {
          return new repository_1.HashRepository(schema, this);
        }
      }
      async close() {
        var _a4;
        await ((_a4 = this.shim) === null || _a4 === void 0 ? void 0 : _a4.close());
        this.shim = void 0;
      }
      async createIndex(options) {
        this.validateShimOpen();
        let { indexName, dataStructure, prefix, schema, stopWords } = options;
        let command = [
          "FT.CREATE",
          indexName,
          "ON",
          dataStructure,
          "PREFIX",
          "1",
          `${prefix}`
        ];
        if (stopWords !== void 0)
          command.push("STOPWORDS", `${stopWords.length}`, ...stopWords);
        command.push("SCHEMA", ...schema);
        await this.shim.execute(command);
      }
      async dropIndex(indexName) {
        this.validateShimOpen();
        await this.shim.execute(["FT.DROPINDEX", indexName]);
      }
      async search(options) {
        this.validateShimOpen();
        let { indexName, query, offset, count } = options;
        return await this.shim.execute([
          "FT.SEARCH",
          indexName,
          query,
          "LIMIT",
          offset.toString(),
          count.toString()
        ]);
      }
      async unlink(key2) {
        this.validateShimOpen();
        await this.shim.unlink(key2);
      }
      async expire(key2, ttl) {
        var _a4;
        this.validateShimOpen();
        await ((_a4 = this.shim) === null || _a4 === void 0 ? void 0 : _a4.expire(key2, ttl));
      }
      async get(key2) {
        this.validateShimOpen();
        return await this.shim.get(key2);
      }
      async set(key2, value) {
        this.validateShimOpen();
        await this.shim.set(key2, value);
      }
      async hgetall(key2) {
        this.validateShimOpen();
        return await this.shim.hgetall(key2);
      }
      async hsetall(key2, data) {
        this.validateShimOpen();
        await this.shim.hsetall(key2, data);
      }
      async jsonget(key2) {
        this.validateShimOpen();
        let json = await this.shim.execute(["JSON.GET", key2, "."]);
        return JSON.parse(json);
      }
      async jsonset(key2, data) {
        this.validateShimOpen();
        let json = JSON.stringify(data);
        await this.shim.execute(["JSON.SET", key2, ".", json]);
      }
      isOpen() {
        return !!this.shim;
      }
      validateShimOpen() {
        if (!this.shim)
          throw new errors_1.default("Redis connection needs opened.");
      }
    };
    exports.default = Client2;
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/entity/entity.js
var require_entity = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/entity/entity.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Entity2 = class {
      constructor(schema, id, data = {}) {
        this.schemaDef = schema.definition;
        this.prefix = schema.prefix;
        this.entityId = id;
        this.entityData = data;
      }
      get keyName() {
        return `${this.prefix}:${this.entityId}`;
      }
      toJSON() {
        let json = { entityId: this.entityId };
        for (let key2 in this.schemaDef) {
          json[key2] = this[key2];
        }
        return json;
      }
    };
    exports.default = Entity2;
  }
});

// node_modules/.pnpm/ulid@2.3.0/node_modules/ulid/dist/index.umd.js
var require_index_umd = __commonJS({
  "node_modules/.pnpm/ulid@2.3.0/node_modules/ulid/dist/index.umd.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global2.ULID = {});
    })(exports, function(exports2) {
      "use strict";
      function createError(message) {
        var err = new Error(message);
        err.source = "ulid";
        return err;
      }
      var ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
      var ENCODING_LEN = ENCODING.length;
      var TIME_MAX = Math.pow(2, 48) - 1;
      var TIME_LEN = 10;
      var RANDOM_LEN = 16;
      function replaceCharAt(str, index, char) {
        if (index > str.length - 1) {
          return str;
        }
        return str.substr(0, index) + char + str.substr(index + 1);
      }
      function incrementBase32(str) {
        var done = void 0;
        var index = str.length;
        var char = void 0;
        var charIndex = void 0;
        var maxCharIndex = ENCODING_LEN - 1;
        while (!done && index-- >= 0) {
          char = str[index];
          charIndex = ENCODING.indexOf(char);
          if (charIndex === -1) {
            throw createError("incorrectly encoded string");
          }
          if (charIndex === maxCharIndex) {
            str = replaceCharAt(str, index, ENCODING[0]);
            continue;
          }
          done = replaceCharAt(str, index, ENCODING[charIndex + 1]);
        }
        if (typeof done === "string") {
          return done;
        }
        throw createError("cannot increment this string");
      }
      function randomChar(prng) {
        var rand = Math.floor(prng() * ENCODING_LEN);
        if (rand === ENCODING_LEN) {
          rand = ENCODING_LEN - 1;
        }
        return ENCODING.charAt(rand);
      }
      function encodeTime(now, len) {
        if (isNaN(now)) {
          throw new Error(now + " must be a number");
        }
        if (now > TIME_MAX) {
          throw createError("cannot encode time greater than " + TIME_MAX);
        }
        if (now < 0) {
          throw createError("time must be positive");
        }
        if (Number.isInteger(now) === false) {
          throw createError("time must be an integer");
        }
        var mod = void 0;
        var str = "";
        for (; len > 0; len--) {
          mod = now % ENCODING_LEN;
          str = ENCODING.charAt(mod) + str;
          now = (now - mod) / ENCODING_LEN;
        }
        return str;
      }
      function encodeRandom(len, prng) {
        var str = "";
        for (; len > 0; len--) {
          str = randomChar(prng) + str;
        }
        return str;
      }
      function decodeTime(id) {
        if (id.length !== TIME_LEN + RANDOM_LEN) {
          throw createError("malformed ulid");
        }
        var time = id.substr(0, TIME_LEN).split("").reverse().reduce(function(carry, char, index) {
          var encodingIndex = ENCODING.indexOf(char);
          if (encodingIndex === -1) {
            throw createError("invalid character found: " + char);
          }
          return carry += encodingIndex * Math.pow(ENCODING_LEN, index);
        }, 0);
        if (time > TIME_MAX) {
          throw createError("malformed ulid, timestamp too large");
        }
        return time;
      }
      function detectPrng() {
        var allowInsecure = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        var root = arguments[1];
        if (!root) {
          root = typeof window !== "undefined" ? window : null;
        }
        var browserCrypto = root && (root.crypto || root.msCrypto);
        if (browserCrypto) {
          return function() {
            var buffer = new Uint8Array(1);
            browserCrypto.getRandomValues(buffer);
            return buffer[0] / 255;
          };
        } else {
          try {
            var nodeCrypto = require("crypto");
            return function() {
              return nodeCrypto.randomBytes(1).readUInt8() / 255;
            };
          } catch (e2) {
          }
        }
        if (allowInsecure) {
          try {
            console.error("secure crypto unusable, falling back to insecure Math.random()!");
          } catch (e2) {
          }
          return function() {
            return Math.random();
          };
        }
        throw createError("secure crypto unusable, insecure Math.random not allowed");
      }
      function factory(currPrng) {
        if (!currPrng) {
          currPrng = detectPrng();
        }
        return function ulid2(seedTime) {
          if (isNaN(seedTime)) {
            seedTime = Date.now();
          }
          return encodeTime(seedTime, TIME_LEN) + encodeRandom(RANDOM_LEN, currPrng);
        };
      }
      function monotonicFactory(currPrng) {
        if (!currPrng) {
          currPrng = detectPrng();
        }
        var lastTime = 0;
        var lastRandom = void 0;
        return function ulid2(seedTime) {
          if (isNaN(seedTime)) {
            seedTime = Date.now();
          }
          if (seedTime <= lastTime) {
            var incrementedRandom = lastRandom = incrementBase32(lastRandom);
            return encodeTime(lastTime, TIME_LEN) + incrementedRandom;
          }
          lastTime = seedTime;
          var newRandom = lastRandom = encodeRandom(RANDOM_LEN, currPrng);
          return encodeTime(seedTime, TIME_LEN) + newRandom;
        };
      }
      var ulid = factory();
      exports2.replaceCharAt = replaceCharAt;
      exports2.incrementBase32 = incrementBase32;
      exports2.randomChar = randomChar;
      exports2.encodeTime = encodeTime;
      exports2.encodeRandom = encodeRandom;
      exports2.decodeTime = decodeTime;
      exports2.detectPrng = detectPrng;
      exports2.factory = factory;
      exports2.monotonicFactory = monotonicFactory;
      exports2.ulid = ulid;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/schema/schema-builder.js
var require_schema_builder = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/schema/schema-builder.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SchemaBuilder = class {
      constructor(schema) {
        this.schema = schema;
      }
      get redisSchema() {
        if (this.schema.dataStructure === "JSON")
          return this.buildJsonSchema();
        if (this.schema.dataStructure === "HASH")
          return this.buildHashSchema();
        throw Error("'FOO' in an invalid data structure. Valid data structures are 'HASH' and 'JSON'.");
      }
      buildHashSchema() {
        let redisSchema = [];
        for (let field in this.schema.definition) {
          redisSchema.push(...this.buildHashSchemaEntry(field));
        }
        return redisSchema;
      }
      buildJsonSchema() {
        let redisSchema = [];
        for (let field in this.schema.definition) {
          redisSchema.push(...this.buildJsonSchemaEntry(field));
        }
        return redisSchema;
      }
      buildHashSchemaEntry(field) {
        var _a4, _b, _c;
        let schemaEntry = [];
        let fieldDef = this.schema.definition[field];
        let fieldType = fieldDef.type;
        let fieldAlias = (_a4 = fieldDef.alias) !== null && _a4 !== void 0 ? _a4 : field;
        schemaEntry.push(fieldAlias);
        if (fieldType === "date")
          schemaEntry.push("NUMERIC");
        if (fieldType === "boolean")
          schemaEntry.push("TAG");
        if (fieldType === "number")
          schemaEntry.push("NUMERIC");
        if (fieldType === "point")
          schemaEntry.push("GEO");
        if (fieldType === "string[]")
          schemaEntry.push("TAG", "SEPARATOR", (_b = fieldDef.separator) !== null && _b !== void 0 ? _b : "|");
        if (fieldType === "string")
          schemaEntry.push("TAG", "SEPARATOR", (_c = fieldDef.separator) !== null && _c !== void 0 ? _c : "|");
        if (fieldType === "text")
          schemaEntry.push("TEXT");
        return schemaEntry;
      }
      buildJsonSchemaEntry(field) {
        var _a4, _b;
        let schemaEntry = [];
        let fieldDef = this.schema.definition[field];
        let fieldType = fieldDef.type;
        let fieldAlias = (_a4 = fieldDef.alias) !== null && _a4 !== void 0 ? _a4 : field;
        let fieldPath = `$.${fieldAlias}${fieldType === "string[]" ? "[*]" : ""}`;
        schemaEntry.push(fieldPath, "AS", fieldAlias);
        if (fieldType === "boolean")
          schemaEntry.push("TAG");
        if (fieldType === "number")
          schemaEntry.push("NUMERIC");
        if (fieldType === "point")
          schemaEntry.push("GEO");
        if (fieldType === "date")
          schemaEntry.push("NUMERIC");
        if (fieldType === "string[]")
          schemaEntry.push("TAG");
        if (fieldType === "string")
          schemaEntry.push("TAG", "SEPARATOR", (_b = fieldDef.separator) !== null && _b !== void 0 ? _b : "|");
        if (fieldType === "text")
          schemaEntry.push("TEXT");
        return schemaEntry;
      }
    };
    exports.default = SchemaBuilder;
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/schema/schema.js
var require_schema = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/schema/schema.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var crypto_1 = require("crypto");
    var ulid_1 = require_index_umd();
    var __1 = require_dist8();
    var schema_builder_1 = __importDefault(require_schema_builder());
    var Schema2 = class {
      constructor(ctor, schemaDef, options) {
        this.entityCtor = ctor;
        this.definition = schemaDef;
        this.options = options;
        this.validateOptions();
        this.defineProperties();
      }
      get prefix() {
        var _a4, _b;
        return (_b = (_a4 = this.options) === null || _a4 === void 0 ? void 0 : _a4.prefix) !== null && _b !== void 0 ? _b : this.entityCtor.name;
      }
      get indexName() {
        var _a4, _b;
        return (_b = (_a4 = this.options) === null || _a4 === void 0 ? void 0 : _a4.indexName) !== null && _b !== void 0 ? _b : `${this.prefix}:index`;
      }
      get indexHashName() {
        var _a4, _b;
        return (_b = (_a4 = this.options) === null || _a4 === void 0 ? void 0 : _a4.indexHashName) !== null && _b !== void 0 ? _b : `${this.prefix}:index:hash`;
      }
      get dataStructure() {
        var _a4, _b;
        return (_b = (_a4 = this.options) === null || _a4 === void 0 ? void 0 : _a4.dataStructure) !== null && _b !== void 0 ? _b : "JSON";
      }
      get useStopWords() {
        var _a4, _b;
        return (_b = (_a4 = this.options) === null || _a4 === void 0 ? void 0 : _a4.useStopWords) !== null && _b !== void 0 ? _b : "DEFAULT";
      }
      get stopWords() {
        var _a4, _b;
        return (_b = (_a4 = this.options) === null || _a4 === void 0 ? void 0 : _a4.stopWords) !== null && _b !== void 0 ? _b : [];
      }
      get indexHash() {
        let data = JSON.stringify({
          definition: this.definition,
          prefix: this.prefix,
          indexName: this.indexName,
          indexHashName: this.indexHashName,
          dataStructure: this.dataStructure,
          useStopWords: this.useStopWords,
          stopWords: this.stopWords
        });
        return (0, crypto_1.createHash)("sha1").update(data).digest("base64");
      }
      get redisSchema() {
        return new schema_builder_1.default(this).redisSchema;
      }
      generateId() {
        var _a4, _b;
        let ulidStrategy = () => (0, ulid_1.ulid)();
        return ((_b = (_a4 = this.options) === null || _a4 === void 0 ? void 0 : _a4.idStrategy) !== null && _b !== void 0 ? _b : ulidStrategy)();
      }
      defineProperties() {
        var _a4;
        let entityName = this.entityCtor.name;
        for (let field in this.definition) {
          let isStringable = function(value) {
            return isString(value) || isNumber(value) || isBoolean(value);
          }, isDateable = function(value) {
            return isDate(value) || isString(value) || isNumber(value);
          }, isPoint = function(value) {
            return isNumber(value.longitude) && isNumber(value.latitude);
          }, isString = function(value) {
            return typeof value === "string";
          }, isNumber = function(value) {
            return typeof value === "number";
          }, isBoolean = function(value) {
            return typeof value === "boolean";
          }, isDate = function(value) {
            return value instanceof Date;
          }, isArray = function(value) {
            return Array.isArray(value);
          };
          this.validateFieldDef(field);
          let fieldDef = this.definition[field];
          let fieldType = fieldDef.type;
          let fieldAlias = (_a4 = fieldDef.alias) !== null && _a4 !== void 0 ? _a4 : field;
          Object.defineProperty(this.entityCtor.prototype, field, {
            configurable: true,
            get: function() {
              var _a5;
              return (_a5 = this.entityData[fieldAlias]) !== null && _a5 !== void 0 ? _a5 : null;
            },
            set: function(value) {
              if (value === void 0) {
                throw Error(`Property '${field}' on entity of type '${entityName}' cannot be set to undefined. Use null instead.`);
              }
              if (value === null) {
                delete this.entityData[fieldAlias];
                return;
              }
              if (fieldType === "string" && isStringable(value)) {
                this.entityData[fieldAlias] = value.toString();
                return;
              }
              if (fieldType === "text" && isStringable(value)) {
                this.entityData[fieldAlias] = value.toString();
                return;
              }
              if (fieldType === "number" && isNumber(value)) {
                this.entityData[fieldAlias] = value;
                return;
              }
              if (fieldType === "boolean" && isBoolean(value)) {
                this.entityData[fieldAlias] = value;
                return;
              }
              if (fieldType === "point" && isPoint(value)) {
                let { longitude, latitude } = value;
                this.entityData[fieldAlias] = { longitude, latitude };
                return;
              }
              if (fieldType === "date" && isDateable(value) && isDate(value)) {
                this.entityData[fieldAlias] = value;
                return;
              }
              if (fieldType === "date" && isDateable(value) && isString(value)) {
                this.entityData[fieldAlias] = new Date(value);
                return;
              }
              if (fieldType === "date" && isDateable(value) && isNumber(value)) {
                let date = new Date();
                date.setTime(value);
                this.entityData[fieldAlias] = date;
                return;
              }
              if (fieldType === "string[]" && isArray(value)) {
                this.entityData[fieldAlias] = value.map((v) => v.toString());
                return;
              }
              throw new __1.RedisError(`Property '${field}' expected type of '${fieldType}' but received value of '${value}'.`);
            }
          });
        }
      }
      validateOptions() {
        var _a4;
        if (!["HASH", "JSON"].includes(this.dataStructure))
          throw Error(`'${this.dataStructure}' in an invalid data structure. Valid data structures are 'HASH' and 'JSON'.`);
        if (!["OFF", "DEFAULT", "CUSTOM"].includes(this.useStopWords))
          throw Error(`'${this.useStopWords}' in an invalid value for stop words. Valid values are 'OFF', 'DEFAULT', and 'CUSTOM'.`);
        if (((_a4 = this.options) === null || _a4 === void 0 ? void 0 : _a4.idStrategy) && !(this.options.idStrategy instanceof Function))
          throw Error("ID strategy must be a function that takes no arguments and returns a string.");
        if (this.prefix === "")
          throw Error(`Prefix must be a non-empty string.`);
        if (this.indexName === "")
          throw Error(`Index name must be a non-empty string.`);
      }
      validateFieldDef(field) {
        let fieldDef = this.definition[field];
        if (!["boolean", "date", "number", "point", "string", "string[]", "text"].includes(fieldDef.type))
          throw Error(`The field '${field}' is configured with a type of '${fieldDef.type}'. Valid types include 'boolean', 'date', 'number', 'point', 'string', 'string[]', and 'text'.`);
      }
    };
    exports.default = Schema2;
  }
});

// node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/index.js
var require_dist8 = __commonJS({
  "node_modules/.pnpm/redis-om@0.2.0/node_modules/redis-om/dist/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Circle = exports.WhereField = exports.Where = exports.RawSearch = exports.Search = exports.AbstractSearch = exports.Schema = exports.Repository = exports.RedisError = exports.Entity = exports.Client = void 0;
    var client_1 = __importDefault(require_client2());
    exports.Client = client_1.default;
    var entity_1 = __importDefault(require_entity());
    exports.Entity = entity_1.default;
    var errors_1 = __importDefault(require_errors3());
    exports.RedisError = errors_1.default;
    var repository_1 = __importDefault(require_repository());
    exports.Repository = repository_1.default;
    var schema_1 = __importDefault(require_schema());
    exports.Schema = schema_1.default;
    var search_1 = require_search();
    Object.defineProperty(exports, "AbstractSearch", { enumerable: true, get: function() {
      return search_1.AbstractSearch;
    } });
    Object.defineProperty(exports, "Search", { enumerable: true, get: function() {
      return search_1.Search;
    } });
    Object.defineProperty(exports, "RawSearch", { enumerable: true, get: function() {
      return search_1.RawSearch;
    } });
    var where_1 = __importDefault(require_where());
    exports.Where = where_1.default;
    var where_field_1 = __importDefault(require_where_field());
    exports.WhereField = where_field_1.default;
    var where_point_1 = require_where_point();
    Object.defineProperty(exports, "Circle", { enumerable: true, get: function() {
      return where_point_1.Circle;
    } });
  }
});

// .svelte-kit/output/server/entries/endpoints/api/index.ts.js
var index_ts_exports = {};
__export(index_ts_exports, {
  get: () => get
});
async function get(request) {
  try {
    let breweryRepo = client.fetchRepository(brewerySchema);
    const data = await breweryRepo.search().returnAll();
    const breweries = data.map((item) => {
      return item.entityData;
    });
    return {
      status: 200,
      body: {
        data: breweries
      }
    };
  } catch (error2) {
    console.error(error2);
    return {
      status: 404,
      body: {
        error: error2
      }
    };
  }
}
var import_redis_om, client, Brewery, brewerySchema;
var init_index_ts = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/index.ts.js"() {
    import_redis_om = __toESM(require_dist8(), 1);
    client = new import_redis_om.Client();
    (async function connect() {
      if (!client.isOpen()) {
        try {
          await client.open("redis://default:ET6ThMOHNvA1MmG1NdsZ7shV5RFnXy5b@redis-18111.c263.us-east-1-2.ec2.cloud.redislabs.com:18111");
        } catch (error2) {
          console.log(error2);
        }
      }
    })();
    Brewery = class extends import_redis_om.Entity {
    };
    brewerySchema = new import_redis_om.Schema(Brewery, {
      name: { type: "string" },
      brewery_type: { type: "string" },
      street: { type: "string" },
      city: { type: "string" },
      state: { type: "string" },
      postal_code: { type: "string" },
      country: { type: "string" },
      longitude: { type: "string" },
      latitude: { type: "string" },
      phone: { type: "string" },
      website_url: { type: "string" }
    }, {
      dataStructure: "JSON"
    });
  }
});

// .svelte-kit/vercel-tmp/entry.js
var entry_exports = {};
__export(entry_exports, {
  default: () => entry_default
});
module.exports = __toCommonJS(entry_exports);

// .svelte-kit/vercel-tmp/shims.js
init_install_fetch();
installFetch();

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.303_sass@1.49.9+svelte@3.46.4/node_modules/@sveltejs/kit/dist/node.js
var import_stream = require("stream");
function get_raw_body(req) {
  return new Promise((fulfil, reject) => {
    const h2 = req.headers;
    if (!h2["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h2["content-length"]);
    if (isNaN(length) && h2["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data);
    });
  });
}
async function getRequest(base2, req) {
  let headers = req.headers;
  if (req.httpVersionMajor === 2) {
    headers = Object.assign({}, headers);
    delete headers[":method"];
    delete headers[":path"];
    delete headers[":authority"];
    delete headers[":scheme"];
  }
  return new Request(base2 + req.url, {
    method: req.method,
    headers,
    body: await get_raw_body(req)
  });
}
async function setResponse(res, response) {
  const headers = Object.fromEntries(response.headers);
  if (response.headers.has("set-cookie")) {
    headers["set-cookie"] = response.headers.raw()["set-cookie"];
  }
  res.writeHead(response.status, headers);
  if (response.body instanceof import_stream.Readable) {
    response.body.pipe(res);
  } else {
    if (response.body) {
      res.write(await response.arrayBuffer());
    }
    res.end();
  }
}

// .svelte-kit/output/server/index.js
init_index_e21f07a7();
var __accessCheck2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet2 = (obj, member, getter) => {
  __accessCheck2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet2 = (obj, member, value, setter) => {
  __accessCheck2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _use_hashes;
var _dev;
var _script_needs_csp;
var _style_needs_csp;
var _directives;
var _script_src;
var _style_src;
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  {
    stores.page.set(page);
  }
  return `


${components[1] ? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => {
      return `${components[2] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
        default: () => {
          return `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}`;
        }
      })}` : `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {})}`}`;
    }
  })}` : `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {})}`}

${``}`;
});
function to_headers(object) {
  const headers = new Headers();
  if (object) {
    for (const key2 in object) {
      const value = object[key2];
      if (!value)
        continue;
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          headers.append(key2, value2);
        });
      } else {
        headers.set(key2, value);
      }
    }
  }
  return headers;
}
function hash(value) {
  let hash2 = 5381;
  let i2 = value.length;
  if (typeof value === "string") {
    while (i2)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
  } else {
    while (i2)
      hash2 = hash2 * 33 ^ value[--i2];
  }
  return (hash2 >>> 0).toString(36);
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key2 in obj) {
    clone2[key2.toLowerCase()] = obj[key2];
  }
  return clone2;
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = params[key2].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
function is_pojo(body) {
  if (typeof body !== "object")
    return false;
  if (body) {
    if (body instanceof Uint8Array)
      return false;
    if (body._readableState && typeof body.pipe === "function")
      return false;
    if (typeof ReadableStream !== "undefined" && body instanceof ReadableStream)
      return false;
  }
  return true;
}
function normalize_request_method(event) {
  const method = event.request.method.toLowerCase();
  return method === "delete" ? "del" : method;
}
function error(body) {
  return new Response(body, {
    status: 500
  });
}
function is_string(s22) {
  return typeof s22 === "string" || s22 instanceof String;
}
var text_types = /* @__PURE__ */ new Set([
  "application/xml",
  "application/json",
  "application/x-www-form-urlencoded",
  "multipart/form-data"
]);
function is_text(content_type) {
  if (!content_type)
    return true;
  const type = content_type.split(";")[0].toLowerCase();
  return type.startsWith("text/") || type.endsWith("+xml") || text_types.has(type);
}
async function render_endpoint(event, mod) {
  const method = normalize_request_method(event);
  let handler = mod[method];
  if (!handler && method === "head") {
    handler = mod.get;
  }
  if (!handler) {
    return event.request.headers.get("x-sveltekit-load") ? new Response(void 0, {
      status: 204
    }) : new Response("Method not allowed", {
      status: 405
    });
  }
  const response = await handler(event);
  const preface = `Invalid response from route ${event.url.pathname}`;
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  if (response.fallthrough) {
    throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
  }
  const { status = 200, body = {} } = response;
  const headers = response.headers instanceof Headers ? new Headers(response.headers) : to_headers(response.headers);
  const type = headers.get("content-type");
  if (!is_text(type) && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if (is_pojo(body) && (!type || type.startsWith("application/json"))) {
    headers.set("content-type", "application/json; charset=utf-8");
    normalized_body = JSON.stringify(body);
  } else {
    normalized_body = body;
  }
  if ((typeof normalized_body === "string" || normalized_body instanceof Uint8Array) && !headers.has("etag")) {
    const cache_control = headers.get("cache-control");
    if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
      headers.set("etag", `"${hash(normalized_body)}"`);
    }
  }
  return new Response(method !== "head" ? normalized_body : void 0, {
    status,
    headers
  });
}
var chars$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key2) {
            return walk(thing[key2]);
          });
      }
    }
  }
  walk(value);
  var names = /* @__PURE__ */ new Map();
  Array.from(counts).filter(function(entry3) {
    return entry3[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry3, i2) {
    names.set(entry3[0], getName(i2));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i2) {
          return i2 in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key2) {
          return safeKey(key2) + ":" + stringify(thing[key2]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i2) {
            statements_1.push(name + "[" + i2 + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a4) {
            var k = _a4[0], v = _a4[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key2) {
            statements_1.push("" + name + safeProp(key2) + "=" + stringify(thing[key2]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars$1[num % chars$1.length] + name;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped2[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escapeUnsafeChars(JSON.stringify(key2));
}
function safeProp(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? "." + key2 : "[" + escapeUnsafeChars(JSON.stringify(key2)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i2 = 0; i2 < str.length; i2 += 1) {
    var char = str.charAt(i2);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped2) {
      result += escaped2[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i2];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop2() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop2) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
var render_json_payload_script_dict = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var render_json_payload_script_regex = new RegExp(`[${Object.keys(render_json_payload_script_dict).join("")}]`, "g");
function render_json_payload_script(attrs, payload) {
  const safe_payload = JSON.stringify(payload).replace(render_json_payload_script_regex, (match) => render_json_payload_script_dict[match]);
  let safe_attrs = "";
  for (const [key2, value] of Object.entries(attrs)) {
    if (value === void 0)
      continue;
    safe_attrs += ` sveltekit:data-${key2}=${escape_html_attr(value)}`;
  }
  return `<script type="application/json"${safe_attrs}>${safe_payload}<\/script>`;
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(`[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`, "g");
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var s2 = JSON.stringify;
function create_prerendering_url_proxy(url) {
  return new Proxy(url, {
    get: (target, prop, receiver) => {
      if (prop === "search" || prop === "searchParams") {
        throw new Error(`Cannot access url.${prop} on a page with prerendering enabled`);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
var encoder = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array = encode(data);
  for (let i2 = 0; i2 < array.length; i2 += 16) {
    const w = array.subarray(i2, i2 + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i22 = 0; i22 < 64; i22++) {
      if (i22 < 16) {
        tmp = w[i22];
      } else {
        a = w[i22 + 1 & 15];
        b = w[i22 + 14 & 15];
        tmp = w[i22 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i22 & 15] + w[i22 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i22];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x2) {
    return (x2 - Math.floor(x2)) * 4294967296;
  }
  let prime = 2;
  for (let i2 = 0; i2 < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i2 < 8) {
        init[i2] = frac(prime ** (1 / 2));
      }
      key[i2] = frac(prime ** (1 / 3));
      i2++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i2 = 0; i2 < bytes.length; i2 += 4) {
    const a = bytes[i2 + 0];
    const b = bytes[i2 + 1];
    const c = bytes[i2 + 2];
    const d = bytes[i2 + 3];
    bytes[i2 + 0] = d;
    bytes[i2 + 1] = c;
    bytes[i2 + 2] = b;
    bytes[i2 + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i2;
  for (i2 = 2; i2 < l; i2 += 3) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2 | bytes[i2] >> 6];
    result += chars[bytes[i2] & 63];
  }
  if (i2 === l + 1) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4];
    result += "==";
  }
  if (i2 === l) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var csp_ready;
var generate_nonce;
var generate_hash;
if (typeof crypto !== "undefined") {
  const array = new Uint8Array(16);
  generate_nonce = () => {
    crypto.getRandomValues(array);
    return base64(array);
  };
  generate_hash = sha256;
} else {
  const name = "crypto";
  csp_ready = import(name).then((crypto2) => {
    generate_nonce = () => {
      return crypto2.randomBytes(16).toString("base64");
    };
    generate_hash = (input) => {
      return crypto2.createHash("sha256").update(input, "utf-8").digest().toString("base64");
    };
  });
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var Csp = class {
  constructor({ mode, directives }, { dev, prerender, needs_nonce }) {
    __privateAdd2(this, _use_hashes, void 0);
    __privateAdd2(this, _dev, void 0);
    __privateAdd2(this, _script_needs_csp, void 0);
    __privateAdd2(this, _style_needs_csp, void 0);
    __privateAdd2(this, _directives, void 0);
    __privateAdd2(this, _script_src, void 0);
    __privateAdd2(this, _style_src, void 0);
    __privateSet2(this, _use_hashes, mode === "hash" || mode === "auto" && prerender);
    __privateSet2(this, _directives, dev ? __spreadValues({}, directives) : directives);
    __privateSet2(this, _dev, dev);
    const d = __privateGet2(this, _directives);
    if (dev) {
      const effective_style_src2 = d["style-src"] || d["default-src"];
      if (effective_style_src2 && !effective_style_src2.includes("unsafe-inline")) {
        d["style-src"] = [...effective_style_src2, "unsafe-inline"];
      }
    }
    __privateSet2(this, _script_src, []);
    __privateSet2(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet2(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet2(this, _style_needs_csp, !dev && !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet2(this, _script_needs_csp) && !__privateGet2(this, _use_hashes);
    this.style_needs_nonce = __privateGet2(this, _style_needs_csp) && !__privateGet2(this, _use_hashes);
    if (this.script_needs_nonce || this.style_needs_nonce || needs_nonce) {
      this.nonce = generate_nonce();
    }
  }
  add_script(content) {
    if (__privateGet2(this, _script_needs_csp)) {
      if (__privateGet2(this, _use_hashes)) {
        __privateGet2(this, _script_src).push(`sha256-${generate_hash(content)}`);
      } else if (__privateGet2(this, _script_src).length === 0) {
        __privateGet2(this, _script_src).push(`nonce-${this.nonce}`);
      }
    }
  }
  add_style(content) {
    if (__privateGet2(this, _style_needs_csp)) {
      if (__privateGet2(this, _use_hashes)) {
        __privateGet2(this, _style_src).push(`sha256-${generate_hash(content)}`);
      } else if (__privateGet2(this, _style_src).length === 0) {
        __privateGet2(this, _style_src).push(`nonce-${this.nonce}`);
      }
    }
  }
  get_header(is_meta = false) {
    const header = [];
    const directives = __spreadValues({}, __privateGet2(this, _directives));
    if (__privateGet2(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet2(this, _style_src)
      ];
    }
    if (__privateGet2(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet2(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = directives[key2];
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
_use_hashes = /* @__PURE__ */ new WeakMap();
_dev = /* @__PURE__ */ new WeakMap();
_script_needs_csp = /* @__PURE__ */ new WeakMap();
_style_needs_csp = /* @__PURE__ */ new WeakMap();
_directives = /* @__PURE__ */ new WeakMap();
_script_src = /* @__PURE__ */ new WeakMap();
_style_src = /* @__PURE__ */ new WeakMap();
var updated = __spreadProps(__spreadValues({}, readable(false)), {
  check: () => false
});
async function render_response({
  branch,
  options,
  state,
  $session,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  stuff
}) {
  if (state.prerender) {
    if (options.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options.template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %svelte.nonce%");
    }
  }
  const stylesheets = new Set(options.manifest._.entry.css);
  const modulepreloads = new Set(options.manifest._.entry.js);
  const styles = /* @__PURE__ */ new Map();
  const serialized_data = [];
  let shadow_props;
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options.get_stack(error2);
  }
  if (resolve_opts.ssr) {
    branch.forEach(({ node, props: props2, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => stylesheets.add(url));
      if (node.js)
        node.js.forEach((url) => modulepreloads.add(url));
      if (node.styles)
        Object.entries(node.styles).forEach(([k, v]) => styles.set(k, v));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (props2)
        shadow_props = props2;
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session,
        updated
      },
      page: {
        error: error2,
        params: event.params,
        routeId: event.routeId,
        status,
        stuff,
        url: state.prerender ? create_prerendering_url_proxy(event.url) : event.url
      },
      components: branch.map(({ node }) => node.module.default)
    };
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
        }
      });
    };
    print_error("origin", "origin");
    print_error("path", "pathname");
    print_error("query", "searchParams");
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      props[`props_${i2}`] = await branch[i2].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let { head, html: body } = rendered;
  const inlined_style = Array.from(styles.values()).join("\n");
  await csp_ready;
  const csp = new Csp(options.csp, {
    dev: options.dev,
    prerender: !!state.prerender,
    needs_nonce: options.template_contains_nonce
  });
  const target = hash(body);
  const init_app = `
		import { start } from ${s2(options.prefix + options.manifest._.entry.file)};
		start({
			target: document.querySelector('[data-hydrate="${target}"]').parentNode,
			paths: ${s2(options.paths)},
			session: ${try_serialize($session, (error3) => {
    throw new Error(`Failed to serialize session data: ${error3.message}`);
  })},
			route: ${!!page_config.router},
			spa: ${!resolve_opts.ssr},
			trailing_slash: ${s2(options.trailing_slash)},
			hydrate: ${resolve_opts.ssr && page_config.hydrate ? `{
				status: ${status},
				error: ${serialize_error(error2)},
				nodes: [
					${(branch || []).map(({ node }) => `import(${s2(options.prefix + node.entry)})`).join(",\n						")}
				],
				params: ${devalue(event.params)},
				routeId: ${s2(event.routeId)}
			}` : "null"}
		});
	`;
  const init_service_worker = `
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('${options.service_worker}');
		}
	`;
  if (options.amp) {
    const styles2 = `${inlined_style}
${rendered.css.code}`;
    head += `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>

		<style amp-custom>${styles2}</style>`;
    if (options.service_worker) {
      head += '<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"><\/script>';
      body += `<amp-install-serviceworker src="${options.service_worker}" layout="nodisplay"></amp-install-serviceworker>`;
    }
  } else {
    if (inlined_style) {
      const attributes = [];
      if (options.dev)
        attributes.push(" data-svelte");
      if (csp.style_needs_nonce)
        attributes.push(` nonce="${csp.nonce}"`);
      csp.add_style(inlined_style);
      head += `
	<style${attributes.join("")}>${inlined_style}</style>`;
    }
    head += Array.from(stylesheets).map((dep) => {
      const attributes = [
        'rel="stylesheet"',
        `href="${options.prefix + dep}"`
      ];
      if (csp.style_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      if (styles.has(dep)) {
        attributes.push("disabled", 'media="(max-width: 0)"');
      }
      return `
	<link ${attributes.join(" ")}>`;
    }).join("");
    if (page_config.router || page_config.hydrate) {
      head += Array.from(modulepreloads).map((dep) => `
	<link rel="modulepreload" href="${options.prefix + dep}">`).join("");
      const attributes = ['type="module"', `data-hydrate="${target}"`];
      csp.add_script(init_app);
      if (csp.script_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      body += `
		<script ${attributes.join(" ")}>${init_app}<\/script>`;
      body += serialized_data.map(({ url, body: body2, response }) => render_json_payload_script({ type: "data", url, body: typeof body2 === "string" ? hash(body2) : void 0 }, response)).join("\n	");
      if (shadow_props) {
        body += render_json_payload_script({ type: "props" }, shadow_props);
      }
    }
    if (options.service_worker) {
      csp.add_script(init_service_worker);
      head += `
				<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_service_worker}<\/script>`;
    }
  }
  if (state.prerender && !options.amp) {
    const http_equiv = [];
    const csp_headers = csp.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (maxage) {
      http_equiv.push(`<meta http-equiv="cache-control" content="max-age=${maxage}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  }
  const segments = event.url.pathname.slice(options.paths.base.length).split("/").slice(2);
  const assets2 = options.paths.assets || (segments.length > 0 ? segments.map(() => "..").join("/") : ".");
  const html = await resolve_opts.transformPage({
    html: options.template({ head, body, assets: assets2, nonce: csp.nonce })
  });
  const headers = new Headers({
    "content-type": "text/html",
    etag: `"${hash(html)}"`
  });
  if (maxage) {
    headers.set("cache-control", `${is_private ? "private" : "public"}, max-age=${maxage}`);
  }
  if (!options.floc) {
    headers.set("permissions-policy", "interest-cohort=()");
  }
  if (!state.prerender) {
    const csp_header = csp.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
  }
  return new Response(html, {
    status,
    headers
  });
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize(__spreadProps(__spreadValues({}, error2), { name, message, stack }));
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
var absolute = /^([a-z]+:)?\/?\//;
var scheme = /^[a-z]+:/;
function resolve(base2, path) {
  if (scheme.test(path))
    return path;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i2 = 0; i2 < pathparts.length; i2 += 1) {
    const part = pathparts[i2];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function is_root_relative(path) {
  return path[0] === "/" && path[1] !== "/";
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && /\/[^./]+$/.test(path)) {
    return path + "/";
  }
  return path;
}
async function load_node({
  event,
  options,
  state,
  route,
  node,
  $session,
  stuff,
  is_error,
  is_leaf,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded;
  const shadow = is_leaf ? await load_shadow_data(route, event, options, !!state.prerender) : {};
  if (shadow.cookies) {
    set_cookie_headers.push(...shadow.cookies);
  }
  if (shadow.error) {
    loaded = {
      status: shadow.status,
      error: shadow.error
    };
  } else if (shadow.redirect) {
    loaded = {
      status: shadow.status,
      redirect: shadow.redirect
    };
  } else if (module2.load) {
    const load_input = {
      url: state.prerender ? create_prerendering_url_proxy(event.url) : event.url,
      params: event.params,
      props: shadow.body || {},
      routeId: event.routeId,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let requested;
        if (typeof resource === "string") {
          requested = resource;
        } else {
          requested = resource.url;
          opts = __spreadValues({
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity
          }, opts);
        }
        opts.headers = new Headers(opts.headers);
        for (const [key2, value] of event.request.headers) {
          if (key2 !== "authorization" && key2 !== "cookie" && key2 !== "host" && key2 !== "if-none-match" && !opts.headers.has(key2)) {
            opts.headers.set(key2, value);
          }
        }
        const resolved = resolve(event.url.pathname, requested.split("?")[0]);
        let response;
        let dependency;
        const prefix = options.paths.assets || options.paths.base;
        const filename = decodeURIComponent(resolved.startsWith(prefix) ? resolved.slice(prefix.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options.manifest.assets.has(filename);
        const is_asset_html = options.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (options.read) {
            const type = is_asset ? options.manifest.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            response = new Response(options.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else {
            response = await fetch(`${event.url.origin}/${file}`, opts);
          }
        } else if (is_root_relative(resolved)) {
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            const cookie = event.request.headers.get("cookie");
            const authorization = event.request.headers.get("authorization");
            if (cookie) {
              opts.headers.set("cookie", cookie);
            }
            if (authorization && !opts.headers.has("authorization")) {
              opts.headers.set("authorization", authorization);
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          response = await respond(new Request(new URL(requested, event.url).href, opts), options, {
            getClientAddress: state.getClientAddress,
            initiator: route,
            prerender: state.prerender
          });
          if (state.prerender) {
            dependency = { response, body: null };
            state.prerender.dependencies.set(resolved, dependency);
          }
        } else {
          if (resolved.startsWith("//")) {
            requested = event.url.protocol + requested;
          }
          if (`.${new URL(requested).hostname}`.endsWith(`.${event.url.hostname}`) && opts.credentials !== "omit") {
            uses_credentials = true;
            const cookie = event.request.headers.get("cookie");
            if (cookie)
              opts.headers.set("cookie", cookie);
          }
          const external_request = new Request(requested, opts);
          response = await options.hooks.externalFetch.call(null, external_request);
        }
        const proxy = new Proxy(response, {
          get(response2, key2, _receiver) {
            async function text() {
              const body = await response2.text();
              const headers = {};
              for (const [key3, value] of response2.headers) {
                if (key3 === "set-cookie") {
                  set_cookie_headers = set_cookie_headers.concat(value);
                } else if (key3 !== "etag") {
                  headers[key3] = value;
                }
              }
              if (!opts.body || typeof opts.body === "string") {
                const status_number = Number(response2.status);
                if (isNaN(status_number)) {
                  throw new Error(`response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`);
                }
                fetched.push({
                  url: requested,
                  body: opts.body,
                  response: {
                    status: status_number,
                    statusText: response2.statusText,
                    headers,
                    body
                  }
                });
              }
              if (dependency) {
                dependency.body = body;
              }
              return body;
            }
            if (key2 === "arrayBuffer") {
              return async () => {
                const buffer = await response2.arrayBuffer();
                if (dependency) {
                  dependency.body = new Uint8Array(buffer);
                }
                return buffer;
              };
            }
            if (key2 === "text") {
              return text;
            }
            if (key2 === "json") {
              return async () => {
                return JSON.parse(await text());
              };
            }
            return Reflect.get(response2, key2, response2);
          }
        });
        return proxy;
      },
      stuff: __spreadValues({}, stuff)
    };
    if (options.dev) {
      Object.defineProperty(load_input, "page", {
        get: () => {
          throw new Error("`page` in `load` functions has been replaced by `url` and `params`");
        }
      });
    }
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module2.load.call(null, load_input);
    if (!loaded) {
      throw new Error(`load function must return a value${options.dev ? ` (${node.entry})` : ""}`);
    }
    if (loaded.fallthrough) {
      throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
    }
  } else if (shadow.body) {
    loaded = {
      props: shadow.body
    };
  } else {
    loaded = {};
  }
  if (shadow.body && state.prerender) {
    const pathname = `${event.url.pathname.replace(/\/$/, "")}/__data.json`;
    const dependency = {
      response: new Response(void 0),
      body: JSON.stringify(shadow.body)
    };
    state.prerender.dependencies.set(pathname, dependency);
  }
  return {
    node,
    props: shadow.body,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
async function load_shadow_data(route, event, options, prerender) {
  if (!route.shadow)
    return {};
  try {
    const mod = await route.shadow();
    if (prerender && (mod.post || mod.put || mod.del || mod.patch)) {
      throw new Error("Cannot prerender pages that have endpoints with mutative methods");
    }
    const method = normalize_request_method(event);
    const is_get = method === "head" || method === "get";
    const handler = method === "head" ? mod.head || mod.get : mod[method];
    if (!handler && !is_get) {
      return {
        status: 405,
        error: new Error(`${method} method not allowed`)
      };
    }
    const data = {
      status: 200,
      cookies: [],
      body: {}
    };
    if (!is_get) {
      const result = await handler(event);
      if (result.fallthrough) {
        throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
      }
      const { status, headers, body } = validate_shadow_output(result);
      data.status = status;
      add_cookies(data.cookies, headers);
      if (status >= 300 && status < 400) {
        data.redirect = headers instanceof Headers ? headers.get("location") : headers.location;
        return data;
      }
      data.body = body;
    }
    const get2 = method === "head" && mod.head || mod.get;
    if (get2) {
      const result = await get2(event);
      if (result.fallthrough) {
        throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
      }
      const { status, headers, body } = validate_shadow_output(result);
      add_cookies(data.cookies, headers);
      data.status = status;
      if (status >= 400) {
        data.error = new Error("Failed to load data");
        return data;
      }
      if (status >= 300) {
        data.redirect = headers instanceof Headers ? headers.get("location") : headers.location;
        return data;
      }
      data.body = __spreadValues(__spreadValues({}, body), data.body);
    }
    return data;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event);
    return {
      status: 500,
      error: error2
    };
  }
}
function add_cookies(target, headers) {
  const cookies = headers["set-cookie"];
  if (cookies) {
    if (Array.isArray(cookies)) {
      target.push(...cookies);
    } else {
      target.push(cookies);
    }
  }
}
function validate_shadow_output(result) {
  const { status = 200, body = {} } = result;
  let headers = result.headers || {};
  if (headers instanceof Headers) {
    if (headers.has("set-cookie")) {
      throw new Error("Endpoint request handler cannot use Headers interface with Set-Cookie headers");
    }
  } else {
    headers = lowercase_keys(headers);
  }
  if (!is_pojo(body)) {
    throw new Error("Body returned from endpoint request handler must be a plain object");
  }
  return { status, headers, body };
}
async function respond_with_error({
  event,
  options,
  state,
  $session,
  status,
  error: error2,
  resolve_opts
}) {
  try {
    const default_layout = await options.manifest._.nodes[0]();
    const default_error = await options.manifest._.nodes[1]();
    const layout_loaded = await load_node({
      event,
      options,
      state,
      route: null,
      node: default_layout,
      $session,
      stuff: {},
      is_error: false,
      is_leaf: false
    });
    const error_loaded = await load_node({
      event,
      options,
      state,
      route: null,
      node: default_error,
      $session,
      stuff: layout_loaded ? layout_loaded.stuff : {},
      is_error: true,
      is_leaf: false,
      status,
      error: error2
    });
    return await render_response({
      options,
      state,
      $session,
      page_config: {
        hydrate: options.hydrate,
        router: options.router
      },
      stuff: error_loaded.stuff,
      status,
      error: error2,
      branch: [layout_loaded, error_loaded],
      event,
      resolve_opts
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return new Response(error3.stack, {
      status: 500
    });
  }
}
async function respond$1(opts) {
  const { event, options, state, $session, route, resolve_opts } = opts;
  let nodes;
  if (!resolve_opts.ssr) {
    return await render_response(__spreadProps(__spreadValues({}, opts), {
      branch: [],
      page_config: {
        hydrate: true,
        router: true
      },
      status: 200,
      error: null,
      event,
      stuff: {}
    }));
  }
  try {
    nodes = await Promise.all(route.a.map((n) => options.manifest._.nodes[n] && options.manifest._.nodes[n]()));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return await respond_with_error({
      event,
      options,
      state,
      $session,
      status: 500,
      error: error3,
      resolve_opts
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options);
  if (state.prerender) {
    const should_prerender = leaf.prerender ?? state.prerender.default;
    if (!should_prerender) {
      return new Response(void 0, {
        status: 204
      });
    }
  }
  let branch = [];
  let status = 200;
  let error2 = null;
  let set_cookie_headers = [];
  let stuff = {};
  ssr:
    if (resolve_opts.ssr) {
      for (let i2 = 0; i2 < nodes.length; i2 += 1) {
        const node = nodes[i2];
        let loaded;
        if (node) {
          try {
            loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
              node,
              stuff,
              is_error: false,
              is_leaf: i2 === nodes.length - 1
            }));
            set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
            if (loaded.loaded.redirect) {
              return with_cookies(new Response(void 0, {
                status: loaded.loaded.status,
                headers: {
                  location: loaded.loaded.redirect
                }
              }), set_cookie_headers);
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e2 = coalesce_to_error(err);
            options.handle_error(e2, event);
            status = 500;
            error2 = e2;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i2--) {
              if (route.b[i2]) {
                const error_node = await options.manifest._.nodes[route.b[i2]]();
                let node_loaded;
                let j = i2;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
                    node: error_node,
                    stuff: node_loaded.stuff,
                    is_error: true,
                    is_leaf: false,
                    status,
                    error: error2
                  }));
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  stuff = __spreadValues(__spreadValues({}, node_loaded.stuff), error_loaded.stuff);
                  break ssr;
                } catch (err) {
                  const e2 = coalesce_to_error(err);
                  options.handle_error(e2, event);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              event,
              options,
              state,
              $session,
              status,
              error: error2,
              resolve_opts
            }), set_cookie_headers);
          }
        }
        if (loaded && loaded.loaded.stuff) {
          stuff = __spreadValues(__spreadValues({}, stuff), loaded.loaded.stuff);
        }
      }
    }
  try {
    return with_cookies(await render_response(__spreadProps(__spreadValues({}, opts), {
      stuff,
      event,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    })), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return with_cookies(await respond_with_error(__spreadProps(__spreadValues({}, opts), {
      status: 500,
      error: error3
    })), set_cookie_headers);
  }
}
function get_page_config(leaf, options) {
  if ("ssr" in leaf) {
    throw new Error("`export const ssr` has been removed \u2014 use the handle hook instead: https://kit.svelte.dev/docs/hooks#handle");
  }
  return {
    router: "router" in leaf ? !!leaf.router : options.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    set_cookie_headers.forEach((value) => {
      response.headers.append("set-cookie", value);
    });
  }
  return response;
}
async function render_page(event, route, options, state, resolve_opts) {
  if (state.initiator === route) {
    return new Response(`Not found: ${event.url.pathname}`, {
      status: 404
    });
  }
  if (route.shadow) {
    const type = negotiate(event.request.headers.get("accept") || "text/html", [
      "text/html",
      "application/json"
    ]);
    if (type === "application/json") {
      return render_endpoint(event, await route.shadow());
    }
  }
  const $session = await options.hooks.getSession(event);
  return respond$1({
    event,
    options,
    state,
    $session,
    resolve_opts,
    route
  });
}
function negotiate(accept, types2) {
  const parts = accept.split(",").map((str, i2) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      return { type, subtype, q: +q, i: i2 };
    }
    throw new Error(`Invalid Accept header: ${accept}`);
  }).sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types2) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex((part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*"));
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function exec(match, names, types2, matchers) {
  const params = {};
  for (let i2 = 0; i2 < names.length; i2 += 1) {
    const name = names[i2];
    const type = types2[i2];
    const value = match[i2 + 1] || "";
    if (type) {
      const matcher = matchers[type];
      if (!matcher)
        throw new Error(`Missing "${type}" param matcher`);
      if (!matcher(value))
        return;
    }
    params[name] = value;
  }
  return params;
}
var DATA_SUFFIX = "/__data.json";
var default_transform = ({ html }) => html;
async function respond(request, options, state) {
  var _a4, _b, _c;
  let url = new URL(request.url);
  const normalized = normalize_path(url.pathname, options.trailing_slash);
  if (normalized !== url.pathname && !((_a4 = state.prerender) == null ? void 0 : _a4.fallback)) {
    return new Response(void 0, {
      status: 301,
      headers: {
        location: (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
      }
    });
  }
  const { parameter, allowed } = options.method_override;
  const method_override = (_b = url.searchParams.get(parameter)) == null ? void 0 : _b.toUpperCase();
  if (method_override) {
    if (request.method === "POST") {
      if (allowed.includes(method_override)) {
        request = new Proxy(request, {
          get: (target, property, _receiver) => {
            if (property === "method")
              return method_override;
            return Reflect.get(target, property, target);
          }
        });
      } else {
        const verb = allowed.length === 0 ? "enabled" : "allowed";
        const body = `${parameter}=${method_override} is not ${verb}. See https://kit.svelte.dev/docs/configuration#methodoverride`;
        return new Response(body, {
          status: 400
        });
      }
    } else {
      throw new Error(`${parameter}=${method_override} is only allowed with POST requests`);
    }
  }
  let decoded = decodeURI(url.pathname);
  let route = null;
  let params = {};
  if (options.paths.base && !((_c = state.prerender) == null ? void 0 : _c.fallback)) {
    if (!decoded.startsWith(options.paths.base)) {
      return new Response(void 0, { status: 404 });
    }
    decoded = decoded.slice(options.paths.base.length) || "/";
  }
  const is_data_request = decoded.endsWith(DATA_SUFFIX);
  if (is_data_request) {
    decoded = decoded.slice(0, -DATA_SUFFIX.length) || "/";
    const normalized2 = normalize_path(url.pathname.slice(0, -DATA_SUFFIX.length), options.trailing_slash);
    url = new URL(url.origin + normalized2 + url.search);
  }
  if (!state.prerender || !state.prerender.fallback) {
    const matchers = await options.manifest._.matchers();
    for (const candidate of options.manifest._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.names, candidate.types, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  const event = {
    get clientAddress() {
      if (!state.getClientAddress) {
        throw new Error(`${"@sveltejs/adapter-vercel"} does not specify getClientAddress. Please raise an issue`);
      }
      Object.defineProperty(event, "clientAddress", {
        value: state.getClientAddress()
      });
      return event.clientAddress;
    },
    locals: {},
    params,
    platform: state.platform,
    request,
    routeId: route && route.id,
    url
  };
  const removed = (property, replacement, suffix = "") => ({
    get: () => {
      throw new Error(`event.${property} has been replaced by event.${replacement}` + suffix);
    }
  });
  const details = ". See https://github.com/sveltejs/kit/pull/3384 for details";
  const body_getter = {
    get: () => {
      throw new Error("To access the request body use the text/json/arrayBuffer/formData methods, e.g. `body = await request.json()`" + details);
    }
  };
  Object.defineProperties(event, {
    method: removed("method", "request.method", details),
    headers: removed("headers", "request.headers", details),
    origin: removed("origin", "url.origin"),
    path: removed("path", "url.pathname"),
    query: removed("query", "url.searchParams"),
    body: body_getter,
    rawBody: body_getter
  });
  let resolve_opts = {
    ssr: true,
    transformPage: default_transform
  };
  try {
    const response = await options.hooks.handle({
      event,
      resolve: async (event2, opts) => {
        if (opts) {
          resolve_opts = {
            ssr: opts.ssr !== false,
            transformPage: opts.transformPage || default_transform
          };
        }
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            event: event2,
            options,
            state,
            $session: await options.hooks.getSession(event2),
            page_config: { router: true, hydrate: true },
            stuff: {},
            status: 200,
            error: null,
            branch: [],
            resolve_opts: __spreadProps(__spreadValues({}, resolve_opts), {
              ssr: false
            })
          });
        }
        if (route) {
          let response2;
          if (is_data_request && route.type === "page" && route.shadow) {
            response2 = await render_endpoint(event2, await route.shadow());
            if (request.headers.has("x-sveltekit-load")) {
              if (response2.status >= 300 && response2.status < 400) {
                const location = response2.headers.get("location");
                if (location) {
                  const headers = new Headers(response2.headers);
                  headers.set("x-sveltekit-location", location);
                  response2 = new Response(void 0, {
                    status: 204,
                    headers
                  });
                }
              }
            }
          } else {
            response2 = route.type === "endpoint" ? await render_endpoint(event2, await route.load()) : await render_page(event2, route, options, state, resolve_opts);
          }
          if (response2) {
            if (response2.status === 200 && response2.headers.has("etag")) {
              let if_none_match_value = request.headers.get("if-none-match");
              if (if_none_match_value == null ? void 0 : if_none_match_value.startsWith('W/"')) {
                if_none_match_value = if_none_match_value.substring(2);
              }
              const etag = response2.headers.get("etag");
              if (if_none_match_value === etag) {
                const headers = new Headers({ etag });
                for (const key2 of [
                  "cache-control",
                  "content-location",
                  "date",
                  "expires",
                  "vary"
                ]) {
                  const value = response2.headers.get(key2);
                  if (value)
                    headers.set(key2, value);
                }
                return new Response(void 0, {
                  status: 304,
                  headers
                });
              }
            }
            return response2;
          }
        }
        if (!state.initiator) {
          const $session = await options.hooks.getSession(event2);
          return await respond_with_error({
            event: event2,
            options,
            state,
            $session,
            status: 404,
            error: new Error(`Not found: ${event2.url.pathname}`),
            resolve_opts
          });
        }
        if (state.prerender) {
          return new Response("not found", { status: 404 });
        }
        return await fetch(request);
      },
      get request() {
        throw new Error("request in handle has been replaced with event" + details);
      }
    });
    if (response && !(response instanceof Response)) {
      throw new Error("handle must return a Response object" + details);
    }
    return response;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event);
    try {
      const $session = await options.hooks.getSession(event);
      return await respond_with_error({
        event,
        options,
        state,
        $session,
        status: 500,
        error: error2,
        resolve_opts
      });
    } catch (e22) {
      const error3 = coalesce_to_error(e22);
      return new Response(options.dev ? error3.stack : error3.message, {
        status: 500
      });
    }
  }
}
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var template = ({ head, body, assets: assets2, nonce }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<title>Brewipedia</title>\n		<meta charset="utf-8" />\n		<meta name="description" content="" />\n		<link rel="icon" href="' + assets2 + '/favicon-32x32.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + "\n	</head>\n	<body>\n		<div>" + body + "</div>\n	</body>\n</html>\n";
var read = null;
set_paths({ "base": "", "assets": "" });
var Server = class {
  constructor(manifest2) {
    this.options = {
      amp: false,
      csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
      dev: false,
      floc: false,
      get_stack: (error2) => String(error2),
      handle_error: (error2, event) => {
        this.options.hooks.handleError({
          error: error2,
          event,
          get request() {
            throw new Error("request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details");
          }
        });
        error2.stack = this.options.get_stack(error2);
      },
      hooks: null,
      hydrate: true,
      manifest: manifest2,
      method_override: { "parameter": "_method", "allowed": [] },
      paths: { base, assets },
      prefix: assets + "/_app/",
      prerender: true,
      read,
      root: Root,
      service_worker: null,
      router: true,
      template,
      template_contains_nonce: false,
      trailing_slash: "never"
    };
  }
  async respond(request, options = {}) {
    if (!(request instanceof Request)) {
      throw new Error("The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details");
    }
    if (!this.options.hooks) {
      const module2 = await Promise.resolve().then(() => (init_hooks_4c32a140(), hooks_4c32a140_exports));
      this.options.hooks = {
        getSession: module2.getSession || (() => ({})),
        handle: module2.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
        handleError: module2.handleError || (({ error: error2 }) => console.error(error2.stack)),
        externalFetch: module2.externalFetch || fetch
      };
    }
    return respond(request, this.options, options);
  }
};

// .svelte-kit/vercel-tmp/manifest.js
var manifest = {
  appDir: "_app",
  assets: /* @__PURE__ */ new Set(["beer.png", "favicon-32x32.png", "favicon.png"]),
  mimeTypes: { ".png": "image/png" },
  _: {
    entry: { "file": "start-b1b4a5a6.js", "js": ["start-b1b4a5a6.js", "chunks/vendor-9d59ef25.js"], "css": [] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2))
    ],
    routes: [
      {
        type: "endpoint",
        id: "api",
        pattern: /^\/api\/?$/,
        names: [],
        types: [],
        load: () => Promise.resolve().then(() => (init_index_ts(), index_ts_exports))
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};

// .svelte-kit/vercel-tmp/entry.js
var server = new Server(manifest);
var entry_default = async (req, res) => {
  let request;
  try {
    request = await getRequest(`https://${req.headers.host}`, req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  setResponse(res, await server.respond(request, {
    getClientAddress() {
      return request.headers.get("x-forwarded-for");
    }
  }));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
