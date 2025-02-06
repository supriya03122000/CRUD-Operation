
{editUser && (
    <div>
      <h2>Edit User</h2>
      <input
        type="text"
        className="form-control mb-2"
        value={editUser.name}
        onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
      />
      <input
        type="email"
        className="form-control mb-2"
        value={editUser.email}
        onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
      />
      <input
        type="password"
        className="form-control mb-2"
        value={editUser.password}
        onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
      />
      <input
        type="date"
        className="form-control mb-2"
        value={editUser.dob}
        onChange={(e) => setEditUser({ ...editUser, dob: e.target.value })}
      />
      <button onClick={handleUpdateUser} className="btn btn-success">
        Update User
      </button>
    </div>
    )}