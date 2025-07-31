package com.Cubix.Jobluu.repositories;

import com.Cubix.Jobluu.dto.NotificationStatus;
import com.Cubix.Jobluu.entities.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification,Long> {

    public List<Notification> findByUserIdAndStatus (Long userId, NotificationStatus status);

}
