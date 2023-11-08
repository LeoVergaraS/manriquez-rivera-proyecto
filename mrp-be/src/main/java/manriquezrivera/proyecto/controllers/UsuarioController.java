package manriquezrivera.proyecto.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
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
        
        User userNuevo = User.builder()
            .username(user.getUsername())
            .password(passwordEncoder.encode(user.getPassword()))
            .role(Role.USER)
            .build();

        Abogado nuevoAbogado = new Abogado();
        nuevoAbogado.setId(null);
        nuevoAbogado.setNombre(userNuevo.getUsername());
        nuevoAbogado.setBorrado(false);
        Abogado abogadoSaved = abogadoService.saveAbogado(nuevoAbogado);

        userNuevo.setId_abogado(abogadoSaved);

        User userSaved = userService.saveUser(userNuevo);
       
        if (userSaved == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(userSaved);
    }
    
}
