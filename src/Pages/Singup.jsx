import { useForm } from 'react-hook-form'
import { registerUser } from '../services/UserServices'
import { useNavigate } from 'react-router-dom'
import reactLogo from '../assets/react.svg'

const Singup = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm() // parametros de react hook form a utilizar

  const onsSubmit = async (data) => {//realiza una peticion con la DATA a la API para que esa info se registre como usuario
    try {
      const response = await registerUser(data)// se le manda la data a la peticion 
      if (response.status === 201) { //si la respuesta de la peticion es 201 te regresa al login
        console.log('User created successfully')
        navigate('/login')
      }
    }catch (error) {
      console.error('Error al crear el usuario:', error.message)// si algo falla aqui sale
    }
  }
  return (
    <main className='form-signin w-100 m-auto'>
      <form onSubmit={handleSubmit(onsSubmit)}>
        <img
          className='mb-4 d-block mx-auto'
          src={reactLogo}
          alt=''
          width={72}
          height={57}
        />

        <h1 className='h3 mb-3 fw-normal text-center'>Create a Reactmazon Account</h1>

        <div className='form-floating'>
          <input type='text'
            className='form-control'
            id='first_name'
            name='first_name'
            placeholder='First Name'
            {...register('first_name', { required: true})}
          />
          <label htmlFor='floatingInput'>First Name</label>
        {errors.first_name && <span>First name is required</span>}
        </div>

        <div className='form-floating'>
          <input type='text'
            className='form-control'
            id='last_name'
            name='last_name'
            placeholder='Last Name'
            {...register('last_name', {required: true})}
          />
          {<label htmlFor='floatingInput'>Last Name</label>}
        {errors.last_name && <span>Last name is required</span>}
        </div>

        <div className='form-floating'>
          <select
            className='form-control'
            id='gender'
            name='gender'
            {...register('gender', {required: true})}
          >
            <option value="">Select</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          <label htmlFor="gender">Gender</label>
        {errors.gender && <span>Gender is required</span>}
        </div>

        <div className='form-floating'>
          <input
            type='email'
            className='form-control'
            id='email'
            placeholder='name@example.com'
            {...register('email', {required: true})}
          />
          <label htmlFor='email'>Email address</label>
        {errors.email && <span>Email is required</span>}
        </div>

        <div className='form-floating'>
          <input
            type='password'
            className='form-control'
            id='password'
            placeholder='Password'
            {...register('password', {required: true})}
          />
          <label htmlFor='floatingPassword'>Password</label>
        {errors.password && <span>Password is required</span>}
        </div>


        <button className='btn btn-primary w-100 py-2' type='submit'>
          Sign in
        </button>

      </form>

    </main>

  )
}

export default Singup
