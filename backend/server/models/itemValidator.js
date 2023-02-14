const z = require('zod')

//validates when new item is being created
const newItemValidation = data => { 
  const createValidationSchema = z.object({
    itemId: z.string().min(6,'Id must be 6 characters or more'),
    itemName : z.string().min(6, 'Item must be 6 characters or more'),
    itemPrice: z.number().itemPrice('Please Input a valid number'),
  });
  
  return createValidationSchema.safeParse(data)
};

module.exports.newItemValidation = newItemValidation;