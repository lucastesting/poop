export const legacyBlogPath = path => path.match(/blog\/\d\d\d\d-\d\d-\d\d-/)
export const legacyBlogUrl = path => path.replace(/blog\/(\d\d\d\d)-(\d\d)-(\d\d)-/,
                                                  (_, year, month, day) => `${year}/${month}/${day}/`).replace(/$/, "/")
