import { useForm } from "react-hook-form"
import styles from './AddEditForm.module.css'
import { addProduct, getProductbyId, updateProduct } from "./api/services"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

type FormData = {
    id: string
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}
export default function AddEditForm() {
    const { id } = useParams<{ id: string }>()
    const isEditMode = !!id
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    // Fetch product data when in edit mode
    useEffect(() => {
        if (isEditMode && id) {
            const fetchProduct = async () => {
                try {
                    setIsLoading(true)
                    const product = await getProductbyId(id)
                    if (product) {
                        reset(product)
                    }
                } catch (err) {
                    alert(err instanceof Error ? err.message : 'Failed to fetch product')
                } finally {
                    setIsLoading(false)
                }
            }
            fetchProduct()
        }
    }, [isEditMode, id, reset])

    const onSubmit = handleSubmit( async (data) => {
      try {
        if (isEditMode && id) {
          await updateProduct(id, data)
          alert("Product updated successfully")
        } else {
          await addProduct(data)
          alert("Product added successfully")
        }
        navigate('/sell-products');
      } catch (err) {
        alert(err instanceof Error ? err.message : `Failed to ${isEditMode ? 'update' : 'add'} product`)
      } 
    })

    const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"]

    if (isLoading) {
        return <div className={styles.formContainer}>Loading...</div>
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.formWrapper}>
                <h2 className={styles.formTitle}>{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={onSubmit} className={styles.form}>

                    <div className={styles.formGroup}>
                        <label htmlFor="title" className={styles.formLabel}>
                            Product Name <span>*</span>
                        </label>
                        <input
                            id="title"
                            {...register("title", { required: "Product name is required" })}
                            className={styles.formInput}
                            placeholder="Enter product name"
                        />
                        {errors.title && <span className={styles.errorMessage}>{errors.title.message}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="price" className={styles.formLabel}>
                            Price <span>*</span>
                        </label>
                        <input
                            id="price"
                            {...register("price", {
                                required: "Price is required",
                                min: { value: 0, message: "Price must be positive" }
                            })}
                            type="number"
                            step="0.01"
                            className={styles.formInput}
                            placeholder="0.00"
                        />
                        {errors.price && <span className={styles.errorMessage}>{errors.price.message}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description" className={styles.formLabel}>
                            Description <span>*</span>
                        </label>
                        <textarea
                            id="description"
                            {...register("description", { required: "Description is required", maxLength: { value: 500, message: "Max length is 500 characters" } })}
                            className={styles.formTextarea}
                            placeholder="Enter product description"
                        />
                        {errors.description && <span className={styles.errorMessage}>{errors.description.message}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="category" className={styles.formLabel}>
                            Category <span>*</span>
                        </label>
                        <select
                            id="category"
                            {...register("category", { required: "Category is required" })}
                            className={styles.formSelect}
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {errors.category && <span className={styles.errorMessage}>{errors.category.message}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="image"  className={styles.formLabel}>
                            Image URL <span>*</span>
                        </label>
                        <input
                            id="image"
                            {...register("image")}
                            className={styles.formInput}
                            placeholder="https://example.com/image.jpg"
                        />
                        {/* <span className={styles.helperText}>Enter a valid image URL</span> */}
                        {/* {errors.image && <span className={styles.errorMessage}>{errors.image.message}</span>} */}
                    </div>

                    <div className={styles.ratingGroup}>
                        <div className={styles.formGroup}>
                            <label htmlFor="ratingRate" className={styles.formLabel}>
                                Rating (0-5)
                            </label>
                            <input
                                id="ratingRate"
                                {...register("rating.rate", {
                                    min: { value: 0, message: "Min 0" },
                                    max: { value: 5, message: "Max 5" }
                                })}
                                type="number"
                                step="0.1"
                                className={styles.formInput}
                                placeholder="4.5"
                                defaultValue={0}
                            />
                            {errors.rating?.rate && <span className={styles.errorMessage}>{errors.rating.rate.message}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="ratingCount" className={styles.formLabel}>
                                Review Count
                            </label>
                            <input
                                id="ratingCount"
                                {...register("rating.count")}
                                type="number"
                                className={styles.formInput}
                                placeholder="0"
                                defaultValue={0}
                            />
                        </div>
                    </div>

                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.submitButton}>
                            {isEditMode ? 'Update Product' : 'Save Product'}
                        </button>
                        <button type="button" className={styles.cancelButton} onClick={() => navigate('/sell-products')}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

