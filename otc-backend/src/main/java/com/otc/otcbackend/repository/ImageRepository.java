package com.otc.otcbackend.repository;


import com.otc.otcbackend.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ImageRepository extends JpaRepository<Image, Long> {

    Optional<Image> findByImageName(String imageName);

}
