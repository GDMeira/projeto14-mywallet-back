export function schemaValidation(schema) {
    return async (req, res, next) => {
        const result = schema.validate(req.body, {abortEarly: false});

        if (result.error) {
            const messages = result.error.details.map(detail => detail.message)
            console.log(messages)
            return res.status(422).send({message: messages})
        }

        next()
    }
}