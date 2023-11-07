package manriquezrivera.proyecto.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import manriquezrivera.proyecto.repositories.UserRepository;
import manriquezrivera.proyecto.user.User;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User obtenerUsuarioLogueado(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username).orElse(null);
    }
    
}
