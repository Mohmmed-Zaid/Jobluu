package com.Cubix.Jobluu.utility;

import org.springframework.stereotype.Component;

@Component
public class Utilities {

    // Simple counter for generating IDs - this is a basic implementation
    private static Long sequenceCounter = 1000L; // Starting from 1000

    /**
     * Generates next sequence ID for given collection name
     * @param collectionName - the name of the collection/table
     * @return next sequence number
     */
    public static synchronized Long getNextSequence(String collectionName) {
        // In a real production environment, you would:
        // 1. Use database sequences
        // 2. Use MongoDB's sequence generation
        // 3. Use UUID
        // 4. Use database auto-increment

        return ++sequenceCounter;
    }}
