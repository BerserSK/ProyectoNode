

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

require('colors');

const { text } = require('express');
const express = require('express');


const app= express();
const { exit } = require('process');

app.get('/',function(req,res){
    res.send('Hello world!')
   
})

 app.listen(3000)



 //Conexión
 let mysql =require('mysql');
const { json } = require('express/lib/response');
 let conexion = mysql.createConnection({
    host:'localhost',
    database:'laravel',
    user:'root',
    password:''
 });

 conexion.connect(function(err){
if(err){
    console.error('error de conexión'+err.start)
    return;
}
//console.log('conectado con el identificador\n'+conexion.threadId);
 });


//Consultar
/*
conexion.query('select * from Codigo',function(error,results,fields){
    if(error)
    throw error;

    results.forEach(result=>{
        console.log(result);
    })

    
});
*/


// el profe lo tiene con un objeto ,validar objeto vacio javascript




rl.question('Escriba el usuario que desea ingresar:'.green,(usuario) =>{
rl.question('Escriba la contraseña que desea ingresar:',(contraseña) =>{
    

    
    
    conexion.query(`SELECT role FROM users WHERE email = "${usuario}" AND password="${contraseña}"; `,function(error,results,fields){
        if(error)
        throw error;

        if(JSON.stringify(results)=='[]'){
                console.log("Usuario no registrado");
                exit();
        
        }  
       results.forEach(result=>{
            console.log(result);
            
            results=JSON.parse(JSON.stringify(result))   // Esto fue lo que me salvo los roles, si lo borran se tiran el inicio de sesión

          //     email: adminjava@gmail.com   ,password:javaadmin 
            if(results.role == 'admin'){
                console.log("Bienvendio admin");
                menuOp();
            }
            //     email: doctorjava@gmail.com  ,password:javadoctor   
            else if(results.role == 'doctor'){
                console.log("Bienvenido doctor");
            }
            //     email: pacientejava@gmail.com   ,password:javapaciente
           else  if(results.role == 'paciente'){
                console.log("Bienvenido paciente");
            }
         
            //exit();
        });
      
    });

    
    
    // Crear Usuario ------------------------
    function crearUsuario(){ 
        rl.question('Escriba el nombre del usuario a registrar: ',(usuarioR) => {
            rl.question('Escriba el email del usuario: ',(emailR) => {
                rl.question('Escriba la contraseña: ',(passwordR) => {
                    rl.question('Escriba el rol del usuario: ',(roleR) => {

                        conexion.query(`INSERT INTO users (id, name, email, email_verified_at, password, cedula, celular, role, remember_token, created_at, updated_at) VALUES ("NULL", "${usuarioR}", "${emailR}", "NULL", "${passwordR}", "NULL", "NULL", "${roleR}", "NULL", "NULL", "NULL")`, function(error, results, fields){
                            if(error)
                            throw error;                 
                        })}
                    )
                })
            })
        }) 
    }

    // Crear Usuario ------------------------
    function actualizarUsuario(){
        rl.question(`Escriba el ID del usuario a modificar: `,(idA) => {
            rl.question(`Escriba el nuevo nombre de usuario: `,(usuarioA) => {
                rl.question(`Escriba el nuevo email del usuario: `,(emailA) => {
                    rl.question(`Escriba la nueva contraseña: `,(passwordA) => {
                        rl.question(`Escriba el nuevo rol del usuario: `,(roleA) => {

                            conexion.query(`UPDATE users SET name = "${usuarioA}" , email = "${emailA}", password = "${passwordA}", role = "${roleA}" WHERE users.id = "${idA}"`), function(error, results, fields){
                                if(error)
                                throw error;
                            }
                        })
                    })
                })
            })
        })
    }
   
    // Eliminar Usuario ------------------------
    function eliminarUsuario(){
        rl.question(`Escriba el ID del usuario a eliminar: `, (idE) => {
            conexion.query(`DELETE FROM users WHERE id = ${idE};`), function(error, results, fields){
                if(error)
                throw error;
            }
        })
    }

    // Menu de acciones admin ------------------------
    function menuOp(){
        console.log('============================================');
        console.log('|                 Acciones de              |');
        console.log('|                Administrador             |');
        console.log('============================================');
        console.log('|                                          |');
        console.log('|           Por favor seleccione una       |');
        console.log('|               de las opciones            |');
        console.log('|                  del menu                |');
        console.log('|                                          |');
        console.log('|                                          |');
        console.log('|    OPT.      Accion                      |');
        console.log('| ---------------------------------------- |');
        console.log('|     1        Registrar Usuario           |');
        console.log('|     2        Editar Usuario              |');
        console.log('|     3        Eliminar Usuario            |');
        console.log('|                                          |');
        console.log('| ---------------------------------------- |');
        console.log('|     Nota: este programa esta realizado   |');
        console.log('|     noje.js con javascript como base.    |');
        console.log('|                                          |');
        console.log('============================================');
        console.log('                                            ');
    
        rl.question('---> Ingresa una opcion del menu: ', function(opt){
            console.log(`---> Ingresaste la opcion: ${opt}`);
            console.log('                                            ');
            Menu(opt)
        })
    }
    
    // Switch con las funciones de las acciones del admin ------------------------
    function Menu(opt){
    
        switch(opt){
            case '1':
                console.log('                               ');
                console.log('====== Registrar Usuario====== ');
                console.log('                               ');
                crearUsuario();
            break;
    
            case '2':
                console.log('                                ');
                console.log('====== Actualizar Usuario====== ');
                console.log('                                ');
                actualizarUsuario();
            break;
    
            case '3':
                console.log('                              ');
                console.log('====== Eliminar Usuario====== ');
                console.log('                              ');
                eliminarUsuario();
            break;
        }
    }
    
    

  //conexion.end();

});});