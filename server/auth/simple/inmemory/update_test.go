package inmemory

import (
	"testing"

	"github.com/jauhararifin/ugrade/server/auth"
	"github.com/jauhararifin/ugrade/server/auth/simple"
)

func TestUpdate(t *testing.T) {
	m, ok := New().(*inMemory)
	if !ok {
		t.Error("New should return inMemory store")
	}

	user := &simple.User{User: &auth.User{}}
	m.mapIDUser["fakeuid"] = user

	newUser := &simple.User{User: &auth.User{}}
	err := m.Update("fakeuid", newUser)

	if err != nil {
		t.Errorf("Expecting error to be nil, found %T instead", err)
	}

	item, ok := m.mapIDUser["fakeuid"]
	if !ok {
		t.Errorf("Expecting 'fakeuid' to exists in mapIDUser")
	}

	if item != newUser {
		t.Errorf("Expecting updated user equals to newUser")
	}
}

func TestUpdateChangeContest(t *testing.T) {
	m, ok := New().(*inMemory)
	if !ok {
		t.Error("New should return inMemory store")
	}

	user := &simple.User{User: &auth.User{ID: "user1", ContestID: "contest1"}}
	m.mapIDUser["user1"] = user
	m.mapContestUsers["contest1"] = []string{"user1"}

	newUser := &simple.User{User: &auth.User{ID: "user1", ContestID: "contest2"}}

	err := m.Update("user1", newUser)
	if err != nil {
		t.Errorf("Expecting error to be nil, found %T instead", err)
	}

	item, ok := m.mapIDUser["user1"]
	if !ok {
		t.Errorf("Expecting 'user1' to exists in mapIDUser")
	}

	if item != newUser {
		t.Errorf("Expecting updated user equals to newUser")
	}

	if len(m.mapContestUsers["contest1"]) > 0 {
		t.Errorf("Expecting contest1 to have no users, found %v instead", m.mapContestUsers["contest1"])
	}

	if len(m.mapContestUsers["contest2"]) != 1 {
		t.Errorf("Expecting contest2 to have one user, found %v instead", m.mapContestUsers["contest2"])
	}

	if m.mapContestUsers["contest2"][0] != "user1" {
		t.Errorf("Expecting contest2 user to be 'user1', found '%s' instead", m.mapContestUsers["contest2"][0])
	}
}

func TestUpdateWithMissingUser(t *testing.T) {
	m, ok := New().(*inMemory)
	if !ok {
		t.Error("New should return inMemory store")
	}

	user := &simple.User{User: &auth.User{}}
	m.mapIDUser["theone"] = user
	newUser := &simple.User{User: &auth.User{}}
	err := m.Update("fakeuid", newUser)

	if err == nil {
		t.Errorf("Expecting error to be noSuchUser, found %T instead", err)
	}
	if _, ok := err.(*noSuchUser); !ok {
		t.Errorf("Expecting error to be noSuchUser, found %T instead", err)
	}
}
