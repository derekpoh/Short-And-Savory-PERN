import { FieldArray, Field, Formik,Form, ErrorMessage } from "formik"
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as yup from "yup"
import { Grid } from "@mui/material";
import { UserState } from "../../utilities/type-declaration"


const formSchema = yup.object().shape({
    recipe: yup.string().min(3, "Must be at least 3 characters").required("This field is required"),
    cuisine: yup.string().min(3, "Must be at least 3 characters").required("This field is required"),
    description: yup.string().max(100, "Cannot exceed 100 characters"),
    ingredients: yup.array(
        yup.object({
        name: yup.string().min(3, "Must be at least 3 characters").required("This field is required"),
        quantity: yup.string().required("This field is required"),
        measurement: yup.string(),
      })
    ).min(1, "Minimum 1 ingredient required"),
  instructions: yup.array(yup.string().required("This field is required")).min(1, "Minimum 1 instruction required"),
  imageurl: yup.array(yup.string().url("Must be a valid Url")),
  imagefile: yup.mixed()
})

const ONEMB = 1024 * 1024; // 1 MB




const CreateRecipeForm = ( {user}:{user:UserState} ) => {
  const initialValues= {
    owner: user,
    recipe: "",
    cuisine: "",
    description: "",
    ingredients: [{
      name: "",
      quantity: "",
      measurement: "",
    }],
    instructions: [""],
    imageurl: [""], 
    imagefile: "",
}
    const navigate = useNavigate();
    const [error, setError] = useState("");

    useEffect(() => {
      if(!user) {
        navigate("/");
        return
      }
    }, [user, navigate])
    
      const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve,reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result as string)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
      }
    
    return (
        <>
        <Typography
        variant="body2"
        color="error"
        align="center"
        sx={{ marginTop: 2 }}
      >
        {error}
      </Typography>
        <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={async (values) => {
            try{
                const token = localStorage.getItem("token");
                const response = await fetch("/api/recipes/create", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                  body: JSON.stringify(values), 
                });
                const data = await response.json();
                if (response.ok) {
                  navigate(`/recipes/${data._id}`)
                } else {
                  throw new Error("Failed to create recipe")
                }
              } catch (error: any) {
                setError(error.message)
              }
        }}
        >
            {({values, errors, touched, setValues, isSubmitting}) => (
        <Form autoComplete="off">
              <Grid container direction="column" spacing={2}>
                    
                    <Field
                    sx={{width: "425px"}}
                    margin="normal"
                    fullWidth
                    type="text"
                    name="recipe"
                    id="recipe"
                    label="Recipe*"
                    as={TextField}
                    helperText={ <ErrorMessage name="recipe" />}
                    error={errors.recipe && touched.recipe}
                    />
                    

                    
                    <Field
                    sx={{width: "425px"}}
                    margin="normal"
                    fullWidth      
                    type="text"
                    name="cuisine"
                    id="cuisine"
                    label="Cuisine*"
                    as={TextField}
                    helperText={ <ErrorMessage name="cuisine" />}
                    error={errors.cuisine && touched.cuisine}
                    />
                   

                   
                    <Field
                    sx={{width: "425px"}}
                    margin="normal"
                    fullWidth
                    type="text"
                    name="description"
                    id="description"
                    label="Description (Short & Sweet, no life stories)"
                    as={TextField}
                    multiline
                    rows={3}
                    helperText={ <ErrorMessage name="description" />}
                    error={errors.description && touched.description}
                    />
                 

                 <Typography variant="h6" fontFamily="Poppins" color="black" fontSize="22px" textOverflow="ellipsis" overflow="clip" gutterBottom>
                 Ingredients:
                 </Typography>
        <FieldArray name="ingredients">
            {
                ({ push, remove }) => {
                    return <>
                        {
                            values.ingredients.map((_, index) => (
                                <Grid
                                container
                                item
                                key={index}
                                spacing={2}
                              >
                                <Grid item container spacing={2} xs={12} sm="auto" >
                              
                                <Field
                                sx={{width: "200px"}}
                                margin="normal"
                                fullWidth
                                type="text" 
                                name={`ingredients[${index}].name`} 
                                _id="name"
                                label="Name*" 
                                as={TextField}
                                helperText={ <ErrorMessage name={`ingredients[${index}].name`} />}
                                error={errors.ingredients && errors.ingredients[index]  && errors.ingredients[index].name  && touched.ingredients && touched.ingredients[index] && touched.ingredients[index].name}
                                />
                                 
                                <Field 
                                sx={{width: "100px"}}
                                margin="normal"
                                fullWidth
                                type="text"
                                name={`ingredients[${index}].quantity`} 
                                _id="quantity"
                                label="Quantity*"
                                as={TextField}
                                helperText={ <ErrorMessage name={`ingredients[${index}].quantity`} />}
                               error={errors.ingredients && errors.ingredients[index]  && errors.ingredients[index].quantity  && touched.ingredients && touched.ingredients[index] && touched.ingredients[index].quantity}
                                />
                               
                                <Field 
                                sx={{width: "125px"}}
                                margin="normal"
                                fullWidth  
                                type="text"
                                name={`ingredients[${index}].measurement`} 
                                _id="measurement"
                                label="Measurement"
                                as={TextField}
                                />
                                 
                                {values.ingredients.length > 1 && (
                            
                                <Button
                                disabled={isSubmitting}
                                onClick={() => remove(index)}
                                >
                                Delete
                                </Button>
                              
                                )}
                        </Grid>
                         </Grid>
                            ))
                        }
                        
                        <Button
                          disabled={isSubmitting}
                          variant="contained"
                          onClick={() => push("")}
                          style={{ width: "200px" }}
                        >
                          Add Ingredient
                        </Button>
                      
                    </>
                }
            }
        </FieldArray>
     <br/>
      <Typography variant="h6" fontFamily="Poppins" color="black" fontSize="22px" textOverflow="ellipsis" overflow="clip" gutterBottom>
                 Instructions:
                 </Typography>
        <FieldArray name="instructions" >
            {
                ({ push, remove }) => {
                    return <>
                        {
                            values.instructions.map((_, index) => (
                                <Grid
                                container
                                item
                                key={index}
                                spacing={2}
                              >
                                <Grid item container spacing={2} xs={12} sm="auto">
                                
                                <Field
                                 sx={{width: "425px"}}
                                 type="text"
                                 name={`instructions[${index}]`} 
                                 id="instructions"
                                 label="Instructions*"
                                 as={TextField}
                                 helperText={ <ErrorMessage name={`instructions[${index}]`} />}
                                 error={errors.instructions && errors.instructions[index] && touched.instructions && touched.instructions[index]}
                                 /> 
                              
                                {values.instructions.length > 1 && (
                                
                                <Button
                                disabled={isSubmitting}
                                onClick={() => remove(index)}
                                >
                                Delete
                                </Button>
                              
                                )}
                        </Grid>
                         </Grid>
                            ))
                        }
                    
                        <Button
                          disabled={isSubmitting}
                          variant="contained"
                          onClick={() => push("")}
                          style={{ width: "200px" }}
                        >
                          Add Instruction
                        </Button>
                      
                    </>
                }
            }
        </FieldArray>
        
        <br/>
      <Typography variant="h6" fontFamily="Poppins" color="black" fontSize="22px" textOverflow="ellipsis" overflow="clip" gutterBottom>
                 Image URL:
                 </Typography>
        <FieldArray name="imageurl">
            {
                ({ push, remove }) => {
                    return <>
                        
                           {values.imageurl && values.imageurl.map((_, index) => (
                                <Grid
                                container
                                item
                                key={index}
                                spacing={2}
                              >
                                <Grid item container spacing={2} xs={12} sm="auto">
                               
                                <Field
                                 sx={{width: "425px"}}
                                 margin="normal"
                                 fullWidth
                                 type="text"
                                 name={`imageurl[${index}]`} 
                                 id="imageurl"
                                 label="Imageurl"
                                 as={TextField}
                                 helperText={ <ErrorMessage name={`imageurl[${index}]`} />}
                                 error={errors.imageurl && errors.imageurl[index] && touched.imageurl && touched.imageurl[index] }
                                 /> 
                              
                                {index > 0 && (
                                <Button
                                disabled={isSubmitting}
                                onClick={() => remove(index)}
                                >
                                Delete
                                </Button>
                         
                                )}
                        </Grid>
                         </Grid>
                            )) 
                        }
                    
                        <Button
                          disabled={isSubmitting}
                          variant="contained"
                          onClick={() => push("")}
                          style={{ width: "200px" }}
                        >
                          Add Image
                        </Button>
                      
                    </>
                }
            }
        </FieldArray>
      <br/>
                <Grid item>
                    <input
                    type="file"
                    id="imagefile"
                    style={{marginLeft:"-15px"}}
                    onChange={async (event) => {
                        if (event.target.files && event.target.files.length > 0) {
                        const file = event.target.files[0]
                        const maxSize = ONEMB;
                        if (file.size > maxSize) {
                          setError('File size exceeds the maximum allowed limit of 1 MB');
                          event.target.value = "";
                          return;
                        }
                        const base64 = await convertToBase64(file)
                        setValues({...values, imagefile: base64})
                    }
                      }}
                    />
               </Grid>

      <Button
          type="submit"
          disabled={isSubmitting}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }} 
        >
        {isSubmitting ? "Submitting" : "Submit"}
        </Button>

        </Grid>
      </Form>
            )}
      </Formik>
      </>
    )
}

export default CreateRecipeForm



