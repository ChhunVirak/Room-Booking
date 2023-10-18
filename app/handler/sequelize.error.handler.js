exports.formatSequelizeError = function formatSequelizeError(error)
{
    try
    {
        if (error.name === 'SequelizeValidationError')
        {
            const formattedErrors = {};

            // Loop through error errors and add them to the formattedErrors object
            for (const err of error.errors)
            {
                console.error(err);
                const fieldName = err.path || 'general'; // Use 'general' if path is not available
                formattedErrors[ fieldName ] = err.message.includes('cannot be null') ? 'is required' : err.message;
            }

            return formattedErrors;
        } else if (error.name === 'SequelizeUniqueConstraintError')
        {
            return { error: 'This value is already in use.' };
        } else if (error.name === 'SequelizeForeignKeyConstraintError')
        {
            return { error: 'Invalid reference or missing data.' };
        } else if (error.name === 'SequelizeExclusionConstraintError')
        {
            return { error: 'This value is excluded.' };
        } else
        {
            console.error(error);
            return { error: 'An error occurred while processing your request.' };
        }
    } catch (error)
    {
        return null;
    }

}