import { stripHtml } from "string-strip-html";


export async function stripHtmlValidation(req, res, next) {
    Object.keys(req.body).forEach(key => {
        if (typeof(req.body[key] === 'string')) {
            req.body[key] = stripHtml(req.body[key]).result
        }
    });

    next()
}