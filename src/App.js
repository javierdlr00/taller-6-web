import React, { useEffect,useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import MaterialDatatable from "material-datatable";

export default function App() {
  const { register, handleSubmit, errors } = useForm();
  const [data,setData] = useState([]);
  const onSubmit = data =>{
    console.log(data);

    axios.post('http://localhost:8000/persona',data)
    .then(res=>{
      console.log(res)
      cargar();
    })
  }

  const cargar = () =>{

    axios.get('http://localhost:8000/personas')
    .then(res=>{

      setData(res.data.personas);


    })
  }

  const columns = [
    {
      name: 'Name',
      field: 'nombre',
      options:{
        width: 70,
      },
    },
    {
      name: 'Apellido',
      field: 'apellido',
      options: {
        width: 70,
      },
    }
  ];

  useEffect(()=>{
    cargar();
  },[])

  useEffect(()=>{
    console.log("TODAS LAS PERSONAS:")

    console.log(data)
  },[data])

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
     <div align="center">
      <input type="text" placeholder="nombre" name="nombre" ref={register({required: true})} />
      <input type="text" placeholder="apellido" name="apellido" ref={register} />

      <input type="submit" />
      </div>
      <div>
      <MaterialDatatable
    title={"Lista de personas"}
    data={data}
    columns={columns}
/>
      </div>
    </form>
  );
}
s