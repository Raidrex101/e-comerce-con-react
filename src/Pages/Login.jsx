import { useForm } from 'react-hook-form'
import { loginUser } from '../services/UserServices'
import { useAuthContext } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import reactLogo from '..//assets/react.svg'
import '../styles/form.css'
const Login = () => {
  
  const navigate = useNavigate()//para redireccionar
  const {login} = useAuthContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data) //se le pasa la data de la peticion para comprobar si el usuario existe
      if (response.status === 200) { //si la respuesta de la peticion es 200 (exitosa en este caso)te regresa al login
        console.log('User logged in successfully')
        
        login(response.data.token)
        navigate('/')
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }
  }


  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit(onSubmit)}>{/* que va a hacer cuando le demos submit */}
        <img
          className="mb-4 d-block mx-auto"
          src={reactLogo}
          alt=""
          width={72}
          height={57}
        />
        <h1 className="h3 mb-3 fw-normal text-center">Reactmazon Login</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            {...register('email',{required:true})} //todos los register son de react hook form para guardar los datos y mandarlos
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        {errors.email && <span>Email is required</span>}

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            {...register('password',{required:true})}
          />
          <label htmlFor="floatingPassword">Password</label>
        {errors.password && <span>Password is required</span>}
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>

      </form>
    </main>


  )
}

export default Login