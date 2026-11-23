// package com.example.demo.entity;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.Table;




// @Entity
// @Table(name = "memory_decks")
// public class MemoryDeck {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private long id;

//     @ManyToOne
//     @JoinColumn(name="owner_id",nullable = false)
//     private SystemUser owner;


//     @Column(nullable=false)
//     private String title;

//     @Column(nullable = false)
//     private String category;

//     @Column(name = "card_count", nullable = false)
//     private Integer cardCount;

//     public MemoryDeck(long id, SystemUser owner, String title, String category, Integer cardCount) {
//         this.id = id;
//         this.owner = owner;
//         this.title = title;
//         this.category = category;
//         this.cardCount = cardCount;
//     }

//     public long getId() {
//         return id;
//     }

//     public void setId(long id) {
//         this.id = id;
//     }

//     public SystemUser getOwner() {
//         return owner;
//     }

//     public void setOwner(SystemUser owner) {
//         this.owner = owner;
//     }

//     public String getTitle() {
//         return title;
//     }

//     public void setTitle(String title) {
//         this.title = title;
//     }

//     public String getCategory() {
//         return category;
//     }

//     public void setCategory(String category) {
//         this.category = category;
//     }

//     public Integer getCardCount() {
//         return cardCount;
//     }

//     public void setCardCount(Integer cardCount) {
//         this.cardCount = cardCount;
//     }

// }




package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "memory_decks")
public class MemoryDeck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name="owner_id", nullable = false)
    private SystemUser owner;

    @Column(nullable=false)
    private String title;

    @Column(nullable = false)
    private String category;

    @Column(name = "card_count", nullable = false)
    private Integer cardCount;

    // Added Default No-Args Constructor (Fixes t11)
    public MemoryDeck() {
    }

    // Parameterized Constructor
    public MemoryDeck(long id, SystemUser owner, String title, String category, Integer cardCount) {
        this.id = id;
        this.owner = owner;
        this.title = title;
        this.category = category;
        this.cardCount = cardCount;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public SystemUser getOwner() {
        return owner;
    }

    public void setOwner(SystemUser owner) {
        this.owner = owner;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getCardCount() {
        return cardCount;
    }

    public void setCardCount(Integer cardCount) {
        this.cardCount = cardCount;
    }
}