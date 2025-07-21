package com.Cubix.Jobluu.utility;

import com.Cubix.Jobluu.entities.Sequence;
import com.Cubix.Jobluu.exception.JobluuException;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class Utilities {

    private static MongoOperations mongoOperations = null;

    public Utilities(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    public static Long getNextSequence(String key) throws JobluuException {
        Query query = new Query(Criteria.where("_id").is(key));
        Update update = new Update().inc("seq", 1);
        FindAndModifyOptions options = FindAndModifyOptions.options().returnNew(true).upsert(true);

        Sequence seq = mongoOperations.findAndModify(query, update, options, Sequence.class);

        if (seq == null) {
            throw new JobluuException("Unable to get sequence id for key: " + key);
        }

        return seq.getSeq();
    }

    public static String generateOTP() {
        StringBuilder otp = new StringBuilder();
        SecureRandom random = new SecureRandom();
        for (int i = 0; i < 6; i++) otp.append(random.nextInt(10));
        return otp.toString();
    }
}
