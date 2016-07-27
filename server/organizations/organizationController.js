var Organization = require('./organizationModel.js');

module.exports = {

  createOrg : function(req, res) {
    var EIN = req.body.EIN ;
    var name = req.body.name ;
    var causes_area = req.body.causes_area ;
    var locations = req.body.locations ;
    var missionStatement = req.body.missionStatement ;
    var contactInfo = req.body.contactInfo ;
    var rate = req.body.rate ;
    var picture = req.body.picture ;
    var currentOpportunities = req.body.currentOpportunities ;
    var pastOpportunities = req.body.pastOpportunities ;
    var owners = req.body.owners ;

    var newOrg = Organization({
      EIN : EIN ,
      name : name ,
      causes_area : causes_area ,
      locations : locations ,
      missionStatement : missionStatement ,
      contactInfo : contactInfo ,
      rate : rate ,
      picture : picture ,
      currentOpportunities : currentOpportunities ,
      pastOpportunities : pastOpportunities ,
      owners : owners
    });

    newOrg.save(function(error, newOrg){
      if(newOrg){
        res.status(201).send(JSON.stringify(newOrg));
      } else {
        res.status(500).send('An error occured');
      }
    });
  },

  getOne : function(req,res){
    Organization.findOne({_id: req.params.id.toString()})
    .exec(function(err, organization){
      if(organization){
        res.status(200).send(JSON.stringify(organization));
      } else{
        res.status(500).send('No such organization exists');
      }
    });
  },

  editProfile : function(req,res){
    Organization.findOne({_id: req.params.id.toString()})
    .exec(function(error, organization){
      if(error){
        res.status(500).send(error);
      } else if(!organization){
        res.status(500).send(new Error ('Organization not added Yet'));
      } else {

        organization.EIN = req.body.EIN || organization.EIN;
        organization.name = req.body.name || organization.name;
        organization.causes_area = req.body.causes_area || organization.causes_area;
        organization.locations = req.body.locations || organization.locations;
        organization.missionStatement = req.body.missionStatement || organization.missionStatement;
        organization.contactInfo = req.body.contactInfo || organization.contactInfo;
        organization.rate = req.body.rate || organization.rate;
        organization.picture = req.body.picture || organization.picture;
        organization.currentOpportunities = req.body.currentOpportunities || organization.currentOpportunities;
        organization.pastOpportunities = req.body.pastOpportunities || organization.pastOpportunities;
        organization.owners = req.body.owners || organization.owners;

        organization.save(function(err, savedOrg){
          if(err){
            res.status(500).send(error);
          } else {
            res.status(201).send('Info Updated!');
          }
        });
      }
    });
  }
};