
export default function Layout({children}:{children:React.ReactNode}){
    return (
      <div>
          <div className='bg-black'>
        <p className="text-white m-0">This is a header</p>
      </div>
        {children}
    
     </div>
    );
  }
  