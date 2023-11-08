package manriquezrivera.proyecto.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import manriquezrivera.proyecto.services.UserService;
import manriquezrivera.proyecto.user.User;

@RestController
@CrossOrigin
@RequestMapping("/auth")
@RequiredArgsConstructor    
public class AuthController {
    
    private final AuthService authService;


    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.register(request));
    }

    @GetMapping("/getUserLogueado")
    public ResponseEntity<User> getUserLogueado(){
        User usuario = userService.obtenerUsuarioLogueado();
        if(usuario == null){
            return ResponseEntity.notFound().build();
        }
        //System.out.println("usuario:"+usuario);
        return ResponseEntity.ok().body(usuario);
    }

}
