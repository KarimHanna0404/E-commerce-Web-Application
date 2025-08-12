package net.soulco.ecommerce.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import net.soulco.ecommerce.dto.LoginDto;
import net.soulco.ecommerce.dto.UserDto;
import net.soulco.ecommerce.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    public record ApiMessage(String message) {}

    @PostMapping(value = "/register", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ApiMessage> registerUser(@Valid @RequestBody UserDto user) {
        userService.register(user);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiMessage("User registered successfully!"));
    }

    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto login, HttpSession session) {
        boolean ok = userService.auth(login);
        if (ok) {
            return ResponseEntity.ok(new ApiMessage("Login successful"));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ApiMessage("Invalid email or password"));
    }

    @GetMapping(value = "/session", produces = "application/json")
    public ResponseEntity<?> showUserDetails(HttpSession session) {
        UserDto dto = userService.showSession(session);
        if (dto == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiMessage("No active session"));
        }
        return ResponseEntity.ok(dto);
    }

    @PostMapping(value = "/logout", produces = "application/json")
    public ResponseEntity<ApiMessage> logout() {
        userService.DeleteSession();
        // 204 is also fine; using 200 + message for clarity
        return ResponseEntity.ok(new ApiMessage("Logged out"));
    }
}