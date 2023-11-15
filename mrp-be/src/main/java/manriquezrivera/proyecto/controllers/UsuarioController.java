package manriquezrivera.proyecto.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import manriquezrivera.proyecto.user.Role;
import manriquezrivera.proyecto.user.User;
import manriquezrivera.proyecto.entity.Abogado;
import manriquezrivera.proyecto.auth.AuthService;
import manriquezrivera.proyecto.services.UserService;
import manriquezrivera.proyecto.services.AbogadoService;

@RestController
@CrossOrigin
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    UserService userService;

    @Autowired
    AuthService authService;

    @Autowired
    AbogadoService abogadoService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        // Si existe el abogado con ese nombre no se crea el usuario
        Abogado abogadoExistente = abogadoService.getAbogadoByNombre(user.getUsername());
        if(abogadoExistente != null){
            return ResponseEntity.badRequest().build();
        }

        // Caso que el usuario se este creando
        if(user.getId() == null){
            // Se crea el usuario
            User userNuevo = User.builder()
            .username(user.getUsername())
            .password(passwordEncoder.encode(user.getPassword()))
            .role(Role.USER)
            .build();
            // Como no existe el abogado se crea uno nuevo
            Abogado abogadoNuevo = new Abogado(null, userNuevo.getUsername(), false);
            Abogado abogadoSaved = abogadoService.saveAbogado(abogadoNuevo);
            
            // Se setea el abogado en el usuario y se guarda el usuario
            userNuevo.setId_abogado(abogadoSaved);
            User userSaved = userService.saveUser(userNuevo);
            return ResponseEntity.ok().body(userSaved);
        }
        // Caso en que el abogado se este editando (el nombre)
        else{
            // Se busca el usuario
            User userExistente = userService.getUserById(user.getId());
            // Se actualiza el nombre del abogado
            Abogado abogado = userExistente.getId_abogado();
            abogado.setNombre(user.getUsername());
            // Se guarda el abogado
            Abogado abogadoSaved = abogadoService.saveAbogado(abogado);
            // Se actualiza el nombre del usuario y el abogado
            userExistente.setUsername(user.getUsername());
            userExistente.setId_abogado(abogadoSaved);
            // Se guarda el usuario
            User userSaved = userService.saveUser(userExistente);
            return ResponseEntity.ok().body(userSaved);

        }
    }

    @PostMapping("/change")
    public ResponseEntity<User> changePassword(@RequestBody User user) {
        // Se busca el usuario
        User userExistente = userService.getUserById(user.getId());
        // Se actualiza la contraseña
        userExistente.setPassword(passwordEncoder.encode(user.getPassword()));
        // Se guarda el usuario
        User userSaved = userService.saveUser(userExistente);
        return ResponseEntity.ok().body(userSaved);
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteUser(@RequestBody User user) {
        // Se busca el usuario

        User userExistente = userService.getUserById(user.getId());
        // Se elimina el usuario
        userService.deleteUser(userExistente);
        // Se elimina el abogado
        abogadoService.deleteAbogado(userExistente.getId_abogado());
        return ResponseEntity.ok().body("Usuario eliminado correctamente");
    }
    
}
