import React, { use, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Container, Row, Col, Card } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import styles from './AddEditForm.module.css'
import { getUsers } from './api/services'

type FormData = {
  username: string
  password: string
}
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
const navigate = useNavigate();
  const onSubmit = handleSubmit( async (data) => {
    // Add login logic here
   const users = await getUsers(); // Fetch users from the API
   const isUser = users.find((user: FormData) => user.username === data.username && user.password === data.password);
  if(isUser) {
    navigate(`/products`);
   } else {
    alert("Invalid username or password");
   }
  })
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={onSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor='username'>Username</label>
                  <input
                    type="text" id="username"
                    className={styles.formInput}
                    {...register('username', { required: {value: true, message: "Username is required"} })}
                  />
                  {errors.username && <span className={styles.errorText}>{errors.username.message}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor='password'>Password</label>
                  <input
                    type="password" id="password"
                    className={styles.formInput}
                    {...register('password', { required: {value: true, message: "Password is required"}, pattern: {value: /^[A-Za-z0-9]{6,}$/, message: "Invalid password"}})}
                  />
                  {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
                </div>
                <div className={styles.buttonContainer}> <Button variant="primary" type="submit" className={styles.submitButton}>
                  Login
                </Button></div>

              </form>
              <div className="text-center mt-3">
                <p>Don't have an account? <Link to="/sign-up">Sign up</Link></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login