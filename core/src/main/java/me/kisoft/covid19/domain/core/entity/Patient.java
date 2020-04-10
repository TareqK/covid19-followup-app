/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package me.kisoft.covid19.domain.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import me.kisoft.covid19.domain.auth.entity.User;
import me.kisoft.covid19.domain.auth.enums.UserRole;
import me.kisoft.covid19.domain.entity.DomainEntity;
import org.hibernate.envers.AuditOverride;
import org.hibernate.envers.Audited;

/**
 *
 * @author tareq
 */
@Entity(name = "Patient")
@Table(name = "APP_USER")
@Getter
@Setter
public class Patient extends DomainEntity {

    @JsonProperty
    private String password;
    private String username;
    private UserRole userRole;
    private String telephoneNumber;

    @ManyToOne
    @Access(AccessType.PROPERTY)
    private Doctor doctor;

    @Access(AccessType.PROPERTY)
    @OneToOne(cascade = CascadeType.ALL)
    MedicalProfile profile = new MedicalProfile();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private List<Reccomendation> reccomendations = new ArrayList<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private List<Question> questions = new ArrayList<>();

    public Patient(User user) {
        this.setUsername(user.getUsername());
        this.setPassword(user.getPassword());
        this.setUserRole(UserRole.ROLE_PATIENT);
        this.setTelephoneNumber(user.getTelephoneNumber());
    }

    public Patient() {

    }

    @JsonIgnore
    public String getPassword() {
        return this.password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    public void addQuestion(Question question) {
        if (questions == null) {
            questions = new ArrayList<>();
        }
        question.setPatient(this);
        questions.add(question);
    }

    public void addReccomendation(Reccomendation reccomendation) {
        if (reccomendations == null) {
            reccomendations = new ArrayList<>();
        }
        reccomendation.setPatient(this);
        reccomendations.add(reccomendation);
    }

    @Override
    public String getEntityName() {
        return "patient";
    }

}
