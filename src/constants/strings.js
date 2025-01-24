export default {
    appName: 'ILUVUS',

    InitialRoute: this.registerscreen,

    authscreen: 'Auth',

    // general
    loginscreen: 'Login',
    registerscreen: 'Register',
    homescreen: 'Main',
    logout: 'Logout',
    verificationscreen: 'Verification',

    cancel: 'Cancel',
    verify: 'Verify',
    ok: 'OK',
    yes: 'Yes',
    no: 'No',
    delete: 'Delete',
    edit: 'Edit',
    save: 'Save',
    update: 'Update',
    add: 'Add',
    search: 'Search',
    post: 'Post',
    comment: 'Comment',
    publish: 'Publish',
    picture: 'Picture',

    // imageviewer screen
    imageviewerscreen: 'MediaViewer',

    // navigation
    hometab: 'Home',
    communitytab: 'Community',
    profiletab: 'Profile',
    messagetab: 'Message',
    settingstab: 'Settings',

    // navigation Community
    setupCommunity: 'SetupCommunity',
    // community buttons
    newCommunity: 'New Group',
    myGroup: 'MyGroup',
    myCommunity: 'Following',
    MyCreatedGroup: 'MyCreatedGroup',
    myGroups: 'My Groups',
    myFriends: 'My Friends',
    loading_indicator: 'Loading...',

    // view community
    communityView: 'Community View',
    requestToJoin: 'Request to Join',
    requestJoin: 'REQUEST JOIN',
    joinUs: 'JOIN US',
    viewPosts: 'VIEW POSTS',

    // community post
    postscreen: 'PostView',
    Post: 'Post',
    CreatePost: 'New Post',
    TagUsers: 'Find Community Users...',
    postDescription: 'Description',
    postContentPlaceholder: 'Please input the content of the post...',
    InterestTopics: 'Find a Interest Topic...',
    ChooseModerators: 'Find Community Moderators...',
    no_post_alert: 'No post available.',

    // Comment
    Comment: 'Comment',
    commentPlaceholder: 'Please input your comment...',

    // setup community
    picturebtn: 'Picture',
    publishbtn: 'Publish',
    setupCommunityName: 'New Community Name',
    setupCommunityNamePlaceholder: 'Please input new community name...',
    

    setupCommunityDescription: 'Description',
    setupCommunityDescriptionPlaceholder:
        'Please input description about the community...',

    
    setupCommunityRules: 'Rules',
    setupCommunityRulesPlaceholder: 'Please input rules for the community...',

    setupCommunityVisibility: "New Group's Visibility",
    setupCommunityVisibilityPlaceholder: 'Please select the visibility',
    Visibility: [
        { key: 'Private', value: 'Private' },
        { key: 'Public', value: 'Public' },
    ],
    setupCommunityType: 'Community Type', // Add this line
    setupCommunityTypePlaceholder: 'Select Community Type', // Add this line
    CommunityTypeOptions: [ // Add this if dropdown options are needed
    { key: 'general', value: 'General' },
    { key: 'professional', value: 'Professional' },
    ],

    //register
    races: [
        { key: 'White', value: 'White' },
        { key: 'African American', value: 'African American' },
        { key: 'Hispanic', value: 'Hispanic' },
        { key: 'Asian', value: 'Asian' },
        { key: 'American Indian', value: 'American Indian' },
        { key: 'Other', value: 'Other' },
    ],
    genders: [
        { key: 'Male', value: 'Male' },
        { key: 'Female', value: 'Female' },
        { key: 'Non-Binary', value: 'Non-Binary' },
        { key: 'Other', value: 'Other' },
    ],
    fnameExample: 'John',
    lnameExample: 'Smith',
    dobExample: 'yyyy-mm-dd (e.g. 2000-01-01)',
    emailExample: 'user@email.com',
    usernameExample: 'Username (e.g. user123)',
    passwordExample: 'Password (e.g. password123)',
    locationExample: 'Location (e.g. 1234 Main St, City, State, Zip)',
    race: 'Please select your race',
    gender: 'Please select your gender',

    // login
    loginAlert: 'Please enter username and password',
    createAnAccount: 'Create an account',
    forgotPassword: 'Forgot Password?',

    // verification
    verification: 'VerificationView',
    enterCode: 'Enter your 6-digit verification code:',
    sentCode: 'We have sent you a verification code.',
    notReceivedCode: "Didn't get a verification code?",
    newCodeResent: 'New Verification Code Sent',
    verificationCancel: 'Verification Cancelled',
    verificationFailed: 'Verification Failed',
    verificationSuccess: 'Verification Successful',
    // enterCode: 'Please enter the entire verification code.',

    //community
    communitySearchBar: 'Explore communities',

    exanple_text: '',

    // upload
    uploadSuccess: 'Upload Successful',
    notificationtab: 'Notification',

    // settings
    settings: 'Settings',

    // report
    reportscreen: 'Report',
    review_reports: 'Review Reports',

    keep_post_title: 'Keep Post',
    keep_post_confirmation: 'Are you sure you want to keep this post?',

    remove_post_title: 'Remove Post',
    remove_post_confirmation: 'Are you sure you want to remove this post?',

    // profile
    bio: 'Personal Bio ✏️',
    details: 'Details',
    profesional_account: 'Profesional',
    dob_details: 'Date of Birth:',
    interests_details: 'Interests:',
    skills_details: 'Skills:',

    // homepage
    no_post_alert: 'No post available.',
    no_post_message:
        'Please select Interests in Profile tab, and follow communities to view posts.',

    // registration
    fname_alert: 'First Name must have 2 or more characters',
    lname_alert: 'Last Name must have 2 or more characters',
    dob_alert: 'Must be 18 years or older',
    invalid_value_alert: 'Please select a value',
    pro_user_question: 'Are you a professional user?',
    email_alert: 'Please enter a valid email address',
    username_alert: 'Username must have 2 or more characters',
    password_alert: 'Password must have 8 or more characters',
    registration_button_alert: 'Please fill out all fields to register',

    // notification
    no_notification_alert: "You don't have any notifications.",
}
