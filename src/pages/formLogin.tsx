import Button from "../components/button";
import Logo from "../assets/logo.png"

const FormLogin = () => {
  return (

    <div className='bg-amber-500 min-h-screen w-full flex flex-col items-center justify-center'>
      <div className='w-96 mt-4 bg-yellow-50 px-6 py-10 rounded-xl'>
        <form className="flex flex-col gap-3">
          <img src={Logo} className="w-50 "></img>
          <h1 className='text-center items-center font-bold text-[2rem] text-orange-700'>Entrar</h1>
          <p className='text-gray-700'>Assine nossa newsletter e matenha-se informado</p>
          <div className="flex flex-col">
            <label className="text-gray-700 text-shadow-md pl-1">Username</label>
            <input className=" rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500" type="text" placeholder="Digite seu username"></input>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-shadow-md pl-1">Password</label>
            <input className="rounded-xl border border-gray-300  px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500" type="password" placeholder="Digite sua senha"></input>
          </div>
          <div>
            <a className="text-sm text-orange-600 py-8 pl-1" href="#">Esqueci a senha</a>
          </div>
          <Button text='Entrar' />
        </form>
      </div>
      <p className='text-white text-xs w-96 mt-2 text-center'>
        Fique de olho no email para receber atualizações do sistema.
      </p>
    </div>
  );
};

export default FormLogin;