package com.Cubix.Jobluu.service;


import com.Cubix.Jobluu.dto.NotificationDTO;
import com.Cubix.Jobluu.entities.Notification;

import java.util.List;

public interface NotificationService {

    public void sendNotification(NotificationDTO notificationDTO);

    public List<Notification> getUnreadNotifications(Long userId);
}
