package api.security;

import api.security.config.AuthEntryPointJwt;
import api.security.config.AuthTokenFilter;
import api.service.usersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;



@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    usersService userDetailsService;

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;


    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        DaoAuthenticationProvider daoProvider = new DaoAuthenticationProvider();
        daoProvider.setPreAuthenticationChecks(toCheck -> {});

        http.cors().and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers("/api/product/page/**").permitAll()
                .antMatchers("/api/product/id/**").permitAll()
                .antMatchers("/api/category/get").permitAll()
                .antMatchers("/api/discount/get").permitAll()
                .antMatchers("/api/payment/**").permitAll()
                .antMatchers("/admin/**").hasRole("ADMIN")
//                .antMatchers("/api/category").hasRole("ADMIN")
//                .antMatchers("/api/discount").hasRole("ADMIN")
//                .antMatchers("/api/image/**").hasRole("ADMIN")
//                .antMatchers("/api/image/**").hasRole("ADMIN")
//                .antMatchers("/api/orders/admin/page").hasRole("ADMIN")
//                .antMatchers("/api/orders/accept").hasRole("ADMIN")
//                .antMatchers("/api/orders/confirm").hasRole("ADMIN")
//                .antMatchers("/api/orders/doanhthu").hasRole("ADMIN")
//                .antMatchers("/api/orders/ttdonhang").hasRole("ADMIN")
//                .antMatchers("/api/repository").hasRole("ADMIN")
//                .antMatchers("/api/users/create").hasRole("ADMIN")


                .anyRequest().authenticated();

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests().antMatchers("/api/auth/**").permitAll().
                anyRequest().authenticated();

//        http.authorizeRequests().and().formLogin()//
//                .loginProcessingUrl("/j_spring_security_login")//
//                .loginPage("/login")//
//                .defaultSuccessUrl("/user")//
//                .failureUrl("/login?message=error")//
//                .usernameParameter("username")//
//                .passwordParameter("password")
//                .and().logout().logoutUrl("/j_spring_security_logout").logoutSuccessUrl("/login?message=logout");

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

    }
}