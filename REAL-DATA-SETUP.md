# 🔄 LeaveFlow - Transition to Real Data

## 🎯 **Overview**

Panduan lengkap untuk menghapus semua data dummy dan setup aplikasi LeaveFlow dengan data real perusahaan Anda.

---

## 🧹 **STEP 1: Clear All Dummy Data**

### **Option A: Automatic Cleanup (Recommended)**
```batch
# Jalankan script otomatis
clear-all-data.bat
```

Script ini akan:
- ✅ Clear database dummy data
- ✅ Clear localStorage dummy data  
- ✅ Reset auto-increment counters
- ✅ Create fresh data structure
- ✅ Create initial admin user

### **Option B: Manual Cleanup**

#### **Clear Database (if using Node.js backend):**
```bash
node clear-database.js
```

#### **Clear localStorage (for online version):**
```bash
node clear-dummy-data.js
# Or add ?clear=true to your URL
```

---

## 👤 **STEP 2: Setup Initial Admin User**

Setelah cleanup, admin user baru akan dibuat:

```
Email: admin@yourcompany.com
Password: admin123
Employee ID: ADMIN001
Position: Administrator
```

### **⚠️ IMPORTANT: Change Credentials Immediately!**

1. **Login dengan credentials di atas**
2. **Go to Master Data → Data Karyawan**
3. **Edit admin user:**
   - Change email to your real admin email
   - Change password to secure password
   - Update name to real admin name
   - Update employee ID if needed

---

## 🏢 **STEP 3: Setup Company Information**

### **Update Regions (Wilayah Kerja):**
1. **Go to Master Data → Wilayah Kerja**
2. **Edit "Head Office Region":**
   - Change name to your real region
   - Update region code
3. **Add additional regions** if needed

### **Update Work Locations (Lokasi Kerja):**
1. **Go to Master Data → Lokasi Kerja**  
2. **Edit "Head Office":**
   - Change name to your real office name
   - Update address to real company address
   - Select correct region
3. **Add additional locations** as needed

### **Review Positions (Jabatan):**
1. **Go to Master Data → Jabatan**
2. **Review default positions:**
   - Staff (Level 1)
   - Supervisor (Level 2)
   - Manager (Level 3)
   - Director (Level 4)
   - Administrator (Level 5)
3. **Modify or add positions** according to your company structure

---

## 👥 **STEP 4: Add Real Employees**

### **Add Employees One by One:**
1. **Go to Master Data → Data Karyawan**
2. **Click "Tambah Karyawan"**
3. **Fill real employee data:**
   - Employee ID (e.g., EMP001, STF001)
   - Full Name
   - Real Email Address
   - Secure Password
   - Correct Position
   - Work Location
   - Supervisor (if applicable)

### **Employee Data Template:**
```
Employee ID: EMP001
Name: John Doe
Email: john.doe@yourcompany.com
Password: SecurePassword123
Position: Staff
Location: Head Office
Supervisor: (Select from existing employees)
Status: Active
```

### **Hierarchy Setup:**
1. **Add Directors first** (no supervisor)
2. **Add Managers** (supervisor: Director)
3. **Add Supervisors** (supervisor: Manager)
4. **Add Staff** (supervisor: Supervisor)

---

## ⚙️ **STEP 5: Configure System Settings**

### **Access System Settings:**
1. **Login as Administrator**
2. **Click "Settings" button** in Quick Actions
3. **Configure company policies:**

### **Leave Policies:**
- Maximum Leave Days per Year: `20` (adjust as needed)
- Maximum Sick Days per Year: `12` (adjust as needed)
- Minimum Notice Days: `3` (adjust as needed)

### **Approval Settings:**
- ✅ Enable Email Notifications
- ⚠️ Auto-approval (enable only if needed)
- ⚠️ SMS Notifications (configure if available)

### **Security Settings:**
- Session Timeout: `60` minutes (adjust as needed)
- Password Change Requirements (enable if needed)

### **System Preferences:**
- Default Language: `Bahasa Indonesia` or `English`
- Date Format: `DD/MM/YYYY` (adjust to company standard)

---

## 📋 **STEP 6: Test System Functionality**

### **Test Employee Login:**
1. **Logout from admin account**
2. **Login with real employee credentials**
3. **Test leave request submission**
4. **Verify employee can see their data**

### **Test Approval Workflow:**
1. **Submit test leave request** as employee
2. **Login as supervisor** to approve
3. **Verify approval chain** works correctly
4. **Test email notifications** (if configured)

### **Test Admin Functions:**
1. **Test employee management** (add/edit/delete)
2. **Test master data management**
3. **Test bulk approval** functionality
4. **Test report generation**

---

## 🔒 **STEP 7: Security Checklist**

### **Change Default Credentials:**
- [ ] ✅ Admin email changed to real email
- [ ] ✅ Admin password changed to secure password
- [ ] ✅ All employee passwords are secure

### **Review Access Levels:**
- [ ] ✅ Only authorized users have admin access
- [ ] ✅ Supervisor hierarchy is correct
- [ ] ✅ Employee permissions are appropriate

### **Data Privacy:**
- [ ] ✅ Remove any test/dummy personal data
- [ ] ✅ Ensure real employee data is accurate
- [ ] ✅ Configure data retention policies

---

## 📊 **STEP 8: Data Migration (If Needed)**

### **If you have existing employee data:**

#### **From Excel/CSV:**
1. **Prepare CSV file** with columns:
   ```
   employee_id,name,email,position,location,supervisor_email
   ```
2. **Use bulk import** (if available) or manual entry
3. **Verify data accuracy** after import

#### **From Other System:**
1. **Export data** from existing system
2. **Map fields** to LeaveFlow structure
3. **Import systematically** by hierarchy level
4. **Verify relationships** (supervisor chains)

---

## 🎯 **STEP 9: Go-Live Checklist**

### **Before Go-Live:**
- [ ] ✅ All dummy data removed
- [ ] ✅ Real company data entered
- [ ] ✅ All employees added with correct hierarchy
- [ ] ✅ System settings configured
- [ ] ✅ Admin credentials secured
- [ ] ✅ Approval workflow tested
- [ ] ✅ Email notifications working (if configured)
- [ ] ✅ User training completed

### **Communication to Users:**
1. **Send announcement** about new system
2. **Provide login credentials** to all employees
3. **Share user guide** and training materials
4. **Set up support channel** for questions

---

## 📞 **STEP 10: Ongoing Maintenance**

### **Regular Tasks:**
- **Weekly**: Review pending approvals
- **Monthly**: Generate usage reports
- **Quarterly**: Review and update employee data
- **Annually**: Review leave policies and settings

### **Data Backup:**
- **Regular backups** of database (if using backend)
- **Export employee data** periodically
- **Document system configuration** changes

---

## 🎉 **Congratulations!**

Your LeaveFlow system is now ready for production use with real company data!

### **What You've Accomplished:**
- ✅ **Removed all dummy data**
- ✅ **Setup real company structure**
- ✅ **Added real employees**
- ✅ **Configured system settings**
- ✅ **Tested functionality**
- ✅ **Secured the system**

### **Your employees can now:**
- Submit real leave requests
- Track request status
- Receive approval notifications
- Manage their profiles

### **Your administrators can:**
- Manage employee data
- Process approvals efficiently
- Generate real reports
- Monitor system usage

**Welcome to your production LeaveFlow system! 🚀✨**

---

## 📞 **Need Help?**

If you encounter issues during the transition:
1. **Check the logs** for error messages
2. **Verify data relationships** (supervisor chains)
3. **Test with small data sets** first
4. **Backup before major changes**
5. **Contact support** if needed

**Happy transitioning to real data! 🎯**