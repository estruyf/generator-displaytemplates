var settings = (function () {
    var client_id = "00000000-0000-0000-0000-000000000000"; // SharePoint Add-in ID
    var client_secret = ""; // SharePoint Add-in secret
    var site = ""; // Fill in your SharePoint Online site URL
    
    var fileMetadata = [
        {
            name: 'Item_Minimal.js',
            metadata: {
                "__metadata": { type: "SP.Data.OData__x005f_catalogs_x002f_masterpageItem" },
                Title: 'Item Minimal Template (via GULP)',
                MasterPageDescription: 'This is a display template added via gulp.',
                ManagedPropertyMapping: "'Path','Title':'Title'",
                ContentTypeId: '0x0101002039C03B61C64EC4A04F5361F38510660500A0383064C59087438E649B7323C95AF6',
                DisplayTemplateLevel: 'Item',
                TargetControlType: {
                    "__metadata": {
                        "type": "Collection(Edm.String)"
                    },
                    "results": [
                        "SearchResults",
                        "Content Web Parts"
                    ]
                }
            }
        },
        {
            name: 'Control_Minimal.js',
            metadata: {
                "__metadata": { type: "SP.Data.OData__x005f_catalogs_x002f_masterpageItem" },
                Title: 'Control Minimal Template (via GULP)',
                MasterPageDescription: 'This is a display template added via gulp.',
                ContentTypeId: '0x0101002039C03B61C64EC4A04F5361F38510660500A0383064C59087438E649B7323C95AF6',
                DisplayTemplateLevel: 'Control',
                TargetControlType: {
                    "__metadata": {
                        "type": "Collection(Edm.String)"
                    },
                    "results": [
                        "SearchResults",
                        "Content Web Parts"
                    ]
                }
            }
        }
    ];
    
    return{
        get: function () {
            return {
                client_id: client_id,
                client_secret: client_secret,
                site: site,
                files_metadata: fileMetadata
            }
        },
        getWatch: function () {
            return {
                client_id: client_id,
                client_secret: client_secret,
                site: site,
                watch: true,
                files_metadata: fileMetadata
            }
        }
    } 
})();

module.exports = settings;